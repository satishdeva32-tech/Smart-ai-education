# Server README

Quick notes for running the server locally.

Prerequisites
- Node.js (v18+ recommended)
- npm

Setup
1. Copy the example environment file and fill values:

```bash
cp .env.example .env
# edit .env and add real secrets (do NOT commit the .env file)
```

2. Install dependencies and start in development mode:

```bash
npm install
npm run dev
```

Notes
- To enable AI features, set `GEMINI_API_KEY` or `GOOGLE_API_KEY` in `.env`.
- To enable database features, set `MONGODB_URI` (or `MONGO_URI`).
- The server exposes a public health endpoint at `/api/health`.

If you want strict fail-fast behavior on missing env vars, modify `server/services/agentService.js` and `server/config/db.js` to throw on missing keys.
