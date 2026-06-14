import { GitHubService } from '@/lib/github';
import { setDocument, getCollection } from '@/lib/firestore';
import { projectsData as staticProjects } from '@/constants/projects';
import { detectRepoTechStack, aggregateSkills } from './tech-detector';
import type { Project, GitHubRepo, Skill } from '@/types';

/**
 * Merges fresh GitHub data with existing Firestore projects,
 * using static constants as an initial seed if Firestore is empty.
 */
export async function syncGitHubToFirestore() {
  console.log('[Sync] Starting GitHub to Firestore sync...');
  
  // 1. Fetch latest data from GitHub
  const github = GitHubService.getInstance();
  await github.refreshCache(); // Force fresh fetch
  const repos = await github.getAllProjects();
  const stats = await github.getStats();
  const current = await github.getCurrentProject();

  if (!repos.length) {
    throw new Error('No repositories found from GitHub. Sync aborted.');
  }

  // 2. Fetch existing projects from Firestore to preserve manual edits
  const existingProjects = await getCollection<Project>('projects');
  
  const existingMap = new Map(existingProjects.map(p => [p.githubUrl?.toLowerCase() || p.id, p]));
  const staticMap = new Map(staticProjects.map(p => [p.githubUrl?.toLowerCase() || p.id, p]));

  const allRepoTechs: string[][] = [];

  // 3. Process each GitHub repo and format it as a Project
  for (const repo of repos) {
    const key = repo.htmlUrl.toLowerCase();
    
    // Check if it already exists in Firestore or static config
    const existing = existingMap.get(key);
    const fallback = staticMap.get(key);

    const isFeatured = repo.topics.includes('featured') || fallback?.featured || false;

    const existingTech = existing?.techStack || [];
    const fallbackTech = fallback?.techStack || [];

    // Safely extract names if they happen to be objects (legacy data in Firestore)
    const extractNames = (arr: any[]) => 
      arr.map(item => typeof item === 'string' ? item : (item?.name || '')).filter(Boolean);

    // Detect deep tech stack (scans package.json)
    const detectedTechStack = await detectRepoTechStack(repo.name, [
      ...(repo.language ? [repo.language] : []),
      ...repo.topics,
      ...extractNames(existingTech),
      ...extractNames(fallbackTech)
    ]);

    allRepoTechs.push(detectedTechStack);

    const projectData: Partial<Project> = {
      title: existing?.title || fallback?.title || repo.name.replace(/-/g, ' '),
      description: existing?.description || fallback?.description || repo.description || '',
      image: existing?.image || fallback?.image || '',
      
      techStack: detectedTechStack,
      
      githubUrl: repo.htmlUrl,
      liveUrl: existing?.liveUrl || fallback?.liveUrl || repo.homepage || '',
      featured: isFeatured,
      
      stars: repo.stars,
      forks: repo.forks,
      updatedAt: repo.updatedAt,
    };

    const docId = existing?.id || fallback?.id || repo.name.toLowerCase();

    // Write to Firestore
    await setDocument('projects', docId, projectData);
  }

  // 4. Aggregate all detected tech into global Skills and save to Firestore
  const aggregatedSkills = aggregateSkills(allRepoTechs);
  for (const skill of aggregatedSkills) {
    // Document ID safe encoding (lowercase, replace spaces with hyphens)
    const skillDocId = skill.label.toLowerCase().replace(/\s+/g, '-');
    await setDocument('skills', skillDocId, skill as any);
  }

  // 5. Save Stats & Current Project
  if (stats) {
    await setDocument('platform', 'stats', stats as any);
  }
  if (current) {
    await setDocument('platform', 'currentProject', current as any);
  }

  console.log(`[Sync] Sync completed. Projects: ${repos.length}, Skills: ${aggregatedSkills.length}`);
  return { success: true, count: repos.length, skillsCount: aggregatedSkills.length };
}
