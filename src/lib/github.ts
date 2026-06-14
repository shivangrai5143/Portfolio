import type { GitHubRepo, GitHubStats } from '@/types';

// ── Config ────────────────────────────────────────────────────────────────────

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'shivangrai5143';
const BASE_URL = 'https://api.github.com';

// ── Language / topic filtering ──────────────────────────────────────────────

/** Markup/config languages to skip when computing tech stack */
const SKIP_LANGUAGES = new Set([
  'HTML', 'CSS', 'Shell', 'Batchfile', 'Makefile',
  'Dockerfile', 'YAML', 'JSON', 'Markdown', 'PLpgSQL',
]);

/** Map GitHub language names → clean display names */
const LANGUAGE_DISPLAY: Record<string, string> = {
  JavaScript: 'JavaScript',
  TypeScript: 'TypeScript',
  Python: 'Python',
  Java: 'Java',
  C: 'C',
  'C++': 'C++',
  'C#': 'C#',
  Go: 'Go',
  Rust: 'Rust',
  PHP: 'PHP',
  Ruby: 'Ruby',
  Swift: 'Swift',
  Kotlin: 'Kotlin',
  Dart: 'Dart',
};

/** Map repo topic strings → display tech names */
const TOPIC_TO_TECH: Record<string, string> = {
  react: 'React',
  reactjs: 'React',
  nodejs: 'Node.js',
  'node-js': 'Node.js',
  express: 'Express',
  expressjs: 'Express',
  mongodb: 'MongoDB',
  mongoose: 'MongoDB',
  firebase: 'Firebase',
  postgresql: 'PostgreSQL',
  postgres: 'PostgreSQL',
  docker: 'Docker',
  socketio: 'Socket.io',
  'socket-io': 'Socket.io',
  tailwindcss: 'Tailwind CSS',
  tailwind: 'Tailwind CSS',
  typescript: 'TypeScript',
  nextjs: 'Next.js',
  'next-js': 'Next.js',
  vuejs: 'Vue.js',
  vue: 'Vue.js',
  mysql: 'MySQL',
  redis: 'Redis',
  graphql: 'GraphQL',
  prisma: 'Prisma',
  aws: 'AWS',
  vercel: 'Vercel',
};

/** Manual tech overrides per repo (what GitHub can't auto-detect) */
const TECH_OVERRIDES: Record<string, string[]> = {
  'Chat-App': ['Firebase', 'Cloudinary', 'Socket.io', 'Real-time'],
  'Project-Management-App': ['MongoDB', 'OpenAI API', 'WebRTC', 'Socket.io'],
  'Coffee-Shop-Web-App': ['MongoDB', 'Stripe'],
  'Weather-App': ['OpenWeather API'],
  Portfolio: ['Vite', 'Framer Motion', 'Vercel'],
};

// ── Types for the raw GitHub API response ────────────────────────────────────

interface RawGitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  pushed_at: string;
  created_at: string;
  archived: boolean;
  fork: boolean;
}

// ── Cache structure ──────────────────────────────────────────────────────────

interface Cache {
  repos: GitHubRepo[] | null;
  stats: GitHubStats | null;
  current: GitHubRepo | null;
  lastUpdated: number | null;
}

const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

// ── Service class (singleton) ────────────────────────────────────────────────

export class GitHubService {
  private static instance: GitHubService;
  private cache: Cache = {
    repos: null,
    stats: null,
    current: null,
    lastUpdated: null,
  };

  private constructor() {}

  static getInstance(): GitHubService {
    if (!GitHubService.instance) {
      GitHubService.instance = new GitHubService();
    }
    return GitHubService.instance;
  }

  // ── Public API ─────────────────────────────────────────────────────────────

  async getCurrentProject(): Promise<GitHubRepo | null> {
    await this.ensureCache();
    return this.cache.current;
  }

  async getStats(): Promise<GitHubStats | null> {
    await this.ensureCache();
    return this.cache.stats;
  }

  async getAllProjects(): Promise<GitHubRepo[]> {
    await this.ensureCache();
    return this.cache.repos ?? [];
  }

  async refreshCache(): Promise<void> {
    this.cache = { repos: null, stats: null, current: null, lastUpdated: null };
    await this.buildCache();
  }

  // ── Internal: cache management ─────────────────────────────────────────────

  private isCacheStale(): boolean {
    return (
      !this.cache.lastUpdated ||
      Date.now() - this.cache.lastUpdated > CACHE_TTL_MS
    );
  }

  private async ensureCache(): Promise<void> {
    if (this.cache.repos === null || this.isCacheStale()) {
      await this.buildCache();
    }
  }

  // ── Internal: GitHub API helpers ───────────────────────────────────────────

  private githubHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };
    if (GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
    }
    return headers;
  }

  private async githubFetch<T>(url: string): Promise<T | null> {
    const res = await fetch(url, { headers: this.githubHeaders() });
    if (res.status === 404) return null;
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`GitHub API ${res.status}: ${text.slice(0, 200)}`);
    }
    return res.json() as Promise<T>;
  }

  /** Fetch ALL public repos with pagination (100 per page) */
  async fetchAllRepos(): Promise<RawGitHubRepo[]> {
    const repos: RawGitHubRepo[] = [];
    let page = 1;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const url = `${BASE_URL}/users/${GITHUB_USERNAME}/repos?type=public&sort=pushed&per_page=100&page=${page}`;
      const data = await this.githubFetch<RawGitHubRepo[]>(url);
      if (!data || data.length === 0) break;
      repos.push(...data);
      if (data.length < 100) break;
      page++;
    }

    return repos;
  }

  /** Fetch language-byte breakdown for one repo */
  async fetchRepoLanguages(repoName: string): Promise<Record<string, number>> {
    try {
      const data = await this.githubFetch<Record<string, number>>(
        `${BASE_URL}/repos/${GITHUB_USERNAME}/${repoName}/languages`
      );
      return data ?? {};
    } catch {
      return {};
    }
  }

  // ── Internal: full cache build ─────────────────────────────────────────────

  private async buildCache(): Promise<void> {
    console.log('[GitHub] Starting cache build…');

    const rawRepos = await this.fetchAllRepos();
    if (!rawRepos.length) {
      console.warn('[GitHub] No repos found — check GITHUB_USERNAME env var');
      return;
    }

    // Batch-fetch language breakdowns (10 at a time to be polite to the API)
    const BATCH_SIZE = 10;
    const allLangResults: PromiseSettledResult<Record<string, number>>[] = [];

    for (let i = 0; i < rawRepos.length; i += BATCH_SIZE) {
      const batch = rawRepos.slice(i, i + BATCH_SIZE);
      const results = await Promise.allSettled(
        batch.map((r) => this.fetchRepoLanguages(r.name))
      );
      allLangResults.push(...results);
    }

    // Aggregate byte counts per language + collect extra techs from topics/overrides
    const languageTotals: Record<string, number> = {};
    const extraTechSet = new Set<string>();

    rawRepos.forEach((repo, idx) => {
      const langs =
        allLangResults[idx]?.status === 'fulfilled'
          ? allLangResults[idx].value
          : {};

      // Sum language bytes (skip markup/config)
      for (const [lang, bytes] of Object.entries(langs)) {
        if (!SKIP_LANGUAGES.has(lang)) {
          languageTotals[lang] = (languageTotals[lang] || 0) + bytes;
        }
      }

      // Topics → tech names
      (repo.topics || []).forEach((topic) => {
        const tech = TOPIC_TO_TECH[topic.toLowerCase()];
        if (tech) extraTechSet.add(tech);
      });

      // Manual overrides
      (TECH_OVERRIDES[repo.name] || []).forEach((t) => extraTechSet.add(t));
    });

    // Build sorted top-languages map
    const sortedLanguages = Object.entries(languageTotals)
      .sort(([, a], [, b]) => b - a);

    const topLanguages: Record<string, number> = {};
    for (const [name, bytes] of sortedLanguages) {
      topLanguages[LANGUAGE_DISPLAY[name] || name] = bytes;
    }

    // Merge languages + extras, deduplicated
    const langNames = Object.keys(topLanguages);
    const techStack = [
      ...langNames,
      ...[...extraTechSet].filter((t) => !langNames.includes(t)),
    ];

    // Format repos → GitHubRepo[]
    const formattedRepos: GitHubRepo[] = rawRepos.map((repo) => ({
      name: repo.name,
      description: repo.description || '',
      htmlUrl: repo.html_url,
      homepage: repo.homepage || '',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language || '',
      topics: repo.topics || [],
      updatedAt: repo.pushed_at,
      isArchived: repo.archived,
      isFork: repo.fork,
    }));

    // Current = most recently pushed (already sorted by GitHub)
    const current = formattedRepos[0] ?? null;

    // Stats
    const stats: GitHubStats = {
      totalRepos: rawRepos.length,
      totalStars: rawRepos.reduce((sum, r) => sum + r.stargazers_count, 0),
      techStack,
      languages: langNames,
      topLanguages,
    };

    // Commit to cache
    this.cache = {
      repos: formattedRepos,
      stats,
      current,
      lastUpdated: Date.now(),
    };

    console.log(
      `[GitHub] Cache ready — ${rawRepos.length} repos, ${techStack.length} techs`
    );
  }
}
