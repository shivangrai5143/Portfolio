const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'shivangrai5143';
const BASE_URL = 'https://api.github.com';

// ── Language / topic filtering ──────────────────────────────────────────────

// Skip these "languages" — they're markup/config, not tech stack items
const SKIP_LANGUAGES = new Set([
  'HTML', 'CSS', 'Shell', 'Batchfile', 'Makefile',
  'Dockerfile', 'YAML', 'JSON', 'Markdown', 'PLpgSQL',
]);

// Map GitHub language names → display names
const LANGUAGE_DISPLAY = {
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

// Map repo topic strings → display tech names
const TOPIC_TO_TECH = {
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

// ── In-memory cache ─────────────────────────────────────────────────────────

const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

let cache = {
  repos: null,
  stats: null,
  current: null,
  lastUpdated: null,
};

function isCacheReady() {
  return cache.repos !== null;
}

function isCacheStale() {
  return !cache.lastUpdated || Date.now() - cache.lastUpdated > CACHE_TTL_MS;
}

function getCache() {
  return cache;
}

// ── GitHub API helpers ───────────────────────────────────────────────────────

function githubHeaders() {
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
  }
  return headers;
}

async function githubFetch(url) {
  const res = await fetch(url, { headers: githubHeaders() });
  if (res.status === 404) return null;
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

// Fetch ALL public repos (handles pagination)
async function fetchAllRepos() {
  const repos = [];
  let page = 1;

  while (true) {
    const url = `${BASE_URL}/users/${GITHUB_USERNAME}/repos?type=public&sort=pushed&per_page=100&page=${page}`;
    const data = await githubFetch(url);
    if (!data || data.length === 0) break;
    repos.push(...data);
    if (data.length < 100) break;
    page++;
  }

  return repos;
}

// Fetch language bytes for one repo
async function fetchRepoLanguages(repoName) {
  try {
    const data = await githubFetch(
      `${BASE_URL}/repos/${GITHUB_USERNAME}/${repoName}/languages`
    );
    return data || {};
  } catch {
    return {};
  }
}

// Load manual tech overrides from JSON file
function loadTechOverrides() {
  try {
    const filePath = path.join(__dirname, '..', 'data', 'techOverrides.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    // Strip comment keys
    const cleaned = {};
    for (const [k, v] of Object.entries(parsed)) {
      if (!k.startsWith('_')) cleaned[k] = v;
    }
    return cleaned;
  } catch {
    return {};
  }
}

// ── Cache builder ────────────────────────────────────────────────────────────

async function buildCache() {
  console.log('[GitHub] Starting cache build...');

  const repos = await fetchAllRepos();
  if (!repos.length) {
    console.warn('[GitHub] No repos found — check GITHUB_USERNAME in .env');
    return;
  }

  const overrides = loadTechOverrides();

  // Fetch all repo languages in parallel (batched to be nice to the API)
  const BATCH_SIZE = 10;
  const allLangResults = [];

  for (let i = 0; i < repos.length; i += BATCH_SIZE) {
    const batch = repos.slice(i, i + BATCH_SIZE);
    const results = await Promise.allSettled(
      batch.map((r) => fetchRepoLanguages(r.name))
    );
    allLangResults.push(...results);
  }

  // Aggregate byte counts per language + collect extra techs
  const languageTotals = {};
  const extraTechSet = new Set();

  repos.forEach((repo, idx) => {
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

    // Add techs from repo topics
    (repo.topics || []).forEach((topic) => {
      const tech = TOPIC_TO_TECH[topic.toLowerCase()];
      if (tech) extraTechSet.add(tech);
    });

    // Add manual overrides for this repo
    (overrides[repo.name] || []).forEach((t) => extraTechSet.add(t));
  });

  // Build sorted top-languages list
  const topLanguages = Object.entries(languageTotals)
    .sort(([, a], [, b]) => b - a)
    .map(([name, bytes]) => ({
      name: LANGUAGE_DISPLAY[name] || name,
      bytes,
    }));

  // Merge languages + extras, deduplicated
  const langNames = topLanguages.map((l) => l.name);
  const techStack = [
    ...langNames,
    ...[...extraTechSet].filter((t) => !langNames.includes(t)),
  ];

  // Format repos for API response
  const formattedRepos = repos.map((repo) => ({
    name: repo.name,
    description: repo.description || null,
    htmlUrl: repo.html_url,
    language: repo.language || null,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    topics: repo.topics || [],
    pushedAt: repo.pushed_at,
    createdAt: repo.created_at,
    isForked: repo.fork,
  }));

  // Current = most recently pushed (already sorted by GitHub)
  const current = formattedRepos[0] || null;

  // Stats
  const stats = {
    totalRepos: repos.length,
    techStack,
    topLanguages,
  };

  // Commit to cache
  cache = { repos: formattedRepos, stats, current, lastUpdated: Date.now() };

  console.log(
    `[GitHub] Cache ready — ${repos.length} repos, ${techStack.length} techs, last updated: ${new Date().toLocaleTimeString()}`
  );
}

module.exports = { buildCache, getCache, isCacheReady, isCacheStale };
