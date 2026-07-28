# FAJ Prime Estates — Backend

Node.js + Express + PostgreSQL API and CMS backend for the FAJ Prime Estates
real estate website.

## Repo history note

This repo originally held both the frontend and backend as a monorepo
(`frontend/` + `backend/`). The frontend has since been moved to its own
separate repository so it could be deployed standalone for an early client
preview, ahead of the backend being ready. This repo now contains **only
the backend**, living in `backend/` for continuity with existing deploy
configuration (Render's root directory is already set to `backend`).

When the frontend and backend are ready to be connected for real:
1. Pull the latest frontend repo
2. Re-apply the API wiring (swap `src/services/api.js`'s mock functions for
   real `fetch()` calls, point `VITE_API_URL` at this backend's deployed URL)
3. Redeploy the frontend

## Setup

See `backend/README.md` for full setup instructions (database, environment
variables, running locally).

```bash
cd backend
npm install
cp .env.example .env
npm run db:migrate
npm run db:generate
npm run db:seed
npm run dev
```
