# FAJ Prime Estates — Backend API

Node.js + Express API and CMS backend for the FAJ Prime Estates website.
Pairs with the React/Vite frontend in `../frontend`.

## Stack

- **Runtime**: Node.js + Express
- **Database**: PostgreSQL (via Prisma ORM) — added in Section 2
- **Auth**: JWT — added in Section 5

## Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Server starts on http://localhost:4000 by default.

Check it's alive:
```bash
curl http://localhost:4000/api/health
```

## Folder structure

```
backend/
├── src/
│   ├── config/       # env loading, (later) database client
│   ├── controllers/  # request handling logic per resource
│   ├── routes/       # Express route definitions per resource
│   ├── middleware/    # auth guards, error handling, validation
│   ├── utils/         # small reusable helpers
│   ├── app.js         # Express app setup (middleware + routes)
│   └── server.js      # starts the HTTP server
├── .env.example
└── package.json
```

## Status

Work in progress, built section by section alongside Claude. Currently at:
**Section 1 — Project scaffolding** (health check endpoint only, no database yet).
