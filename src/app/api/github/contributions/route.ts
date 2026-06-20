import { NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'shivangrai5143';
const BASE_URL = 'https://api.github.com';

const headers: Record<string, string> = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
};

interface RawSearchRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  pushed_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  fork: boolean;
}

export async function GET() {
  try {
    // 1. Search repos where the user has committed (not owned by them)
    const searchUrl = `${BASE_URL}/search/repositories?q=committer:${GITHUB_USERNAME}+fork:true&sort=updated&per_page=50`;
    const searchRes = await fetch(searchUrl, { headers });
    const searchData = searchRes.ok ? await searchRes.json() : { items: [] };

    // 2. Filter to only repos NOT owned by this user (actual contributions)
    const contributed: RawSearchRepo[] = (searchData.items ?? []).filter(
      (r: RawSearchRepo) => r.owner.login.toLowerCase() !== GITHUB_USERNAME.toLowerCase()
    );

    // 3. Also fetch repos the user has forked (their forked repos show their contributions)
    const forkedRes = await fetch(
      `${BASE_URL}/users/${GITHUB_USERNAME}/repos?type=public&sort=pushed&per_page=100`,
      { headers }
    );
    const allRepos: RawSearchRepo[] = forkedRes.ok ? await forkedRes.json() : [];
    const forkedRepos = allRepos.filter((r) => r.fork);

    // 4. For each forked repo, get parent info
    const forkedWithParents = await Promise.all(
      forkedRepos.slice(0, 10).map(async (repo) => {
        try {
          const detailRes = await fetch(
            `${BASE_URL}/repos/${GITHUB_USERNAME}/${repo.name}`,
            { headers }
          );
          if (!detailRes.ok) return null;
          const detail = await detailRes.json();
          if (!detail.parent) return null;
          return {
            name: detail.parent.name,
            full_name: detail.parent.full_name,
            description: detail.parent.description,
            html_url: detail.parent.html_url,
            homepage: detail.parent.homepage,
            stargazers_count: detail.parent.stargazers_count,
            forks_count: detail.parent.forks_count,
            language: detail.parent.language,
            topics: detail.parent.topics ?? [],
            pushed_at: repo.pushed_at,
            owner: detail.parent.owner,
            fork: false,
            isContribution: true,
            myForkUrl: repo.html_url,
          };
        } catch {
          return null;
        }
      })
    );

    // 5. Merge: contributed (from search) + forked parents, deduplicated
    const forkedParents = forkedWithParents.filter(Boolean);
    const contributedFormatted = contributed.map((r) => ({
      name: r.name,
      full_name: r.full_name,
      description: r.description,
      html_url: r.html_url,
      homepage: r.homepage,
      stargazers_count: r.stargazers_count,
      forks_count: r.forks_count,
      language: r.language,
      topics: r.topics ?? [],
      pushed_at: r.pushed_at,
      owner: r.owner,
      isContribution: true,
      myForkUrl: null,
    }));

    // Deduplicate by html_url
    const seen = new Set<string>();
    const all = [...contributedFormatted, ...forkedParents].filter((r) => {
      if (!r || seen.has(r.html_url)) return false;
      seen.add(r.html_url);
      return true;
    });

    // Sort by pushed_at desc
    all.sort((a, b) => new Date(b!.pushed_at).getTime() - new Date(a!.pushed_at).getTime());

    return NextResponse.json({ contributions: all, count: all.length });
  } catch (error) {
    console.error('[Contributions API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contributions', contributions: [], count: 0 },
      { status: 500 }
    );
  }
}
