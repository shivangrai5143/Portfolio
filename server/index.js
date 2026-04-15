require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');

const githubRouter = require('./routes/github');
const { buildCache } = require('./services/githubService');

const app = express();
const PORT = process.env.PORT || 3001;

// ── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
  : ['http://localhost:5173', 'http://localhost:5174'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, curl, server-to-server)
      if (!origin) return callback(null, true);
      
      // Allow any localhost origin
      if (origin.startsWith('http://localhost:')) return callback(null, true);
      
      // Allow any vercel.app subdomain
      if (origin.endsWith('.vercel.app')) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS blocked: ${origin}`));
    },
    methods: ['GET', 'POST'],
  })
);

app.use(express.json());

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

// ── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/github', githubRouter);

// ── 404 fallback ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found.` });
});

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error('[Error]', err.message);
  res.status(500).json({ error: 'Internal server error.' });
});

// ── Cron: refresh cache every 6 hours ────────────────────────────────────────
cron.schedule('0 */6 * * *', async () => {
  console.log('[Cron] Scheduled cache refresh triggered');
  try {
    await buildCache();
  } catch (err) {
    console.error('[Cron] Refresh failed:', err.message);
  }
});

// ── Startup ───────────────────────────────────────────────────────────────────
app.listen(PORT, async () => {
  console.log(`\n🚀 Portfolio API running on http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/health`);
  console.log(`   GitHub: http://localhost:${PORT}/api/github/stats\n`);

  // Warm the cache immediately on start
  try {
    await buildCache();
  } catch (err) {
    console.error('[Startup] Initial cache build failed:', err.message);
    console.error('[Startup] Endpoints will return 503 until cache is built.');
    console.error('[Startup] Make sure GITHUB_TOKEN is set in server/.env');
  }
});
