const { Router } = require('express');
const { getCache, buildCache, isCacheReady } = require('../services/githubService');

const router = Router();

// ── Cache-readiness middleware ───────────────────────────────────────────────
function requireCache(req, res, next) {
  if (!isCacheReady()) {
    return res.status(503).json({
      error: 'Data is still loading. Please retry in a few seconds.',
      retryAfter: 10,
    });
  }
  next();
}

// ── GET /api/github/current ─────────────────────────────────────────────────
// Returns the most recently updated (pushed) public repo
router.get('/current', requireCache, (req, res) => {
  const { current } = getCache();
  if (!current) {
    return res.status(404).json({ error: 'No current project found.' });
  }
  res.json(current);
});

// ── GET /api/github/stats ────────────────────────────────────────────────────
// Returns total repo count, full tech stack, and top languages
router.get('/stats', requireCache, (req, res) => {
  const { stats } = getCache();
  res.json(stats);
});

// ── GET /api/github/projects ─────────────────────────────────────────────────
// Returns all public repos sorted by most recently pushed
router.get('/projects', requireCache, (req, res) => {
  const { repos } = getCache();

  // Optional query: ?limit=10
  const limit = parseInt(req.query.limit, 10);
  const result = limit ? repos.slice(0, limit) : repos;

  res.json(result);
});

// ── POST /api/github/refresh ─────────────────────────────────────────────────
// Manually trigger a cache refresh (useful to call after a big push)
router.post('/refresh', async (req, res) => {
  try {
    await buildCache();
    res.json({ success: true, message: 'Cache refreshed successfully.' });
  } catch (err) {
    console.error('[refresh] Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/github/cache-info ───────────────────────────────────────────────
// Debugging endpoint: shows cache metadata
router.get('/cache-info', (req, res) => {
  const { lastUpdated, repos, stats } = getCache();
  res.json({
    ready: isCacheReady(),
    lastUpdated: lastUpdated ? new Date(lastUpdated).toISOString() : null,
    repoCount: repos?.length ?? 0,
    techCount: stats?.techStack?.length ?? 0,
  });
});

module.exports = router;
