import axios from 'axios';

// Falls back to localhost:3001 when VITE_API_URL is not set
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: `${API_BASE}/api/github`,
  timeout: 8000,
});

/**
 * Fetch the most recently updated repository.
 * Returns null if the backend is unreachable — the UI gracefully hides the banner.
 */
export async function getCurrentProject() {
  try {
    const { data } = await api.get('/current');
    return data;
  } catch {
    return null;
  }
}

/**
 * Fetch aggregated stats: totalRepos, techStack[], topLanguages[]
 */
export async function getGitHubStats() {
  try {
    const { data } = await api.get('/stats');
    return data;
  } catch {
    return null;
  }
}

/**
 * Fetch all public repos (sorted by most recently pushed).
 * @param {number} [limit] - Optional maximum number of repos to return
 */
export async function getGitHubProjects(limit) {
  try {
    const params = limit ? { limit } : {};
    const { data } = await api.get('/projects', { params });
    return data;
  } catch {
    return null;
  }
}
