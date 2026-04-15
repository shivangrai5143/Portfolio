import { useState, useEffect } from 'react';
import {
  getCurrentProject,
  getGitHubStats,
  getGitHubProjects,
} from '../services/githubService';

/**
 * useGitHubStats
 *
 * Fetches all three GitHub API endpoints in parallel.
 * Any endpoint failure resolves to null — the UI degrades gracefully.
 *
 * @returns {{
 *   current: object|null,
 *   stats: object|null,
 *   projects: object[]|null,
 *   loading: boolean,
 *   error: string|null
 * }}
 */
export function useGitHubStats() {
  const [state, setState] = useState({
    current: null,
    stats: null,
    projects: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      const [currentResult, statsResult, projectsResult] =
        await Promise.allSettled([
          getCurrentProject(),
          getGitHubStats(),
          getGitHubProjects(),
        ]);

      if (cancelled) return;

      setState({
        current:
          currentResult.status === 'fulfilled' ? currentResult.value : null,
        stats:
          statsResult.status === 'fulfilled' ? statsResult.value : null,
        projects:
          projectsResult.status === 'fulfilled' ? projectsResult.value : null,
        loading: false,
        error: null,
      });
    }

    fetchAll();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
