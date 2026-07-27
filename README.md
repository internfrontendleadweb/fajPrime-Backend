# FAJ Prime Estates — Monorepo

Premium real estate website for FAJ Prime Estates Ltd.

This repo contains two independently deployable apps:

```
faj-prime/
├── frontend/   # React + Vite + Tailwind website (existing)
└── backend/    # Node.js + Express + PostgreSQL API & CMS (new)
```

Each has its own `package.json`, `README.md`, and gets deployed to Render
as its own service, sharing this one repo.

- Frontend setup: see `frontend/README.md`
- Backend setup: see `backend/README.md`

## Local development

Run both, in two terminals:

```bash
# Terminal 1
cd frontend && npm install && npm run dev

# Terminal 2
cd backend && npm install && npm run dev
```
