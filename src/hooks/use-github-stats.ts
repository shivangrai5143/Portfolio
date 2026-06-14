'use client';

import { useState, useEffect } from 'react';
import type { GitHubRepo, GitHubStats, Skill } from '@/types';

export interface GitHubStatsState {
  current: GitHubRepo | null;
  stats: GitHubStats | null;
  projects: GitHubRepo[] | null;
  skills: Skill[] | null;
  loading: boolean;
  error: string | null;
}

/**
 * Fetches all GitHub API endpoints in parallel.
 * Any endpoint failure resolves to null — the UI degrades gracefully.
 */
export function useGitHubStats(): GitHubStatsState {
  const [state, setState] = useState<GitHubStatsState>({
    current: null,
    stats: null,
    projects: null,
    skills: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      try {
        const [currentResult, statsResult, projectsResult, skillsResult] =
          await Promise.allSettled([
            fetch('/api/github/current').then((r) =>
              r.ok ? (r.json() as Promise<GitHubRepo>) : null
            ),
            fetch('/api/github/stats').then((r) =>
              r.ok ? (r.json() as Promise<GitHubStats>) : null
            ),
            fetch('/api/github/projects').then((r) =>
              r.ok ? (r.json() as Promise<GitHubRepo[]>) : null
            ),
            fetch('/api/github/skills').then((r) =>
              r.ok ? (r.json() as Promise<Skill[]>) : null
            ),
          ]);

        if (cancelled) return;

        setState({
          current:
            currentResult.status === 'fulfilled'
              ? currentResult.value
              : null,
          stats:
            statsResult.status === 'fulfilled' ? statsResult.value : null,
          projects:
            projectsResult.status === 'fulfilled'
              ? projectsResult.value
              : null,
          skills:
            skillsResult.status === 'fulfilled'
              ? skillsResult.value
              : null,
          loading: false,
          error: null,
        });
      } catch (err) {
        if (cancelled) return;
        setState((prev) => ({
          ...prev,
          loading: false,
          error:
            err instanceof Error ? err.message : 'Failed to fetch GitHub data',
        }));
      }
    }

    fetchAll();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
