# FAJ Prime Estates — Backend API

Node.js + Express API and CMS backend for the FAJ Prime Estates website.
Pairs with the React/Vite frontend in `../frontend`.

## Stack

- **Runtime**: Node.js + Express
- **Database**: PostgreSQL (via Prisma ORM)
- **Auth**: JWT — added in Section 5

## Setup

```bash
cd backend
npm install
cp .env.example .env
```

### Database

You need a local PostgreSQL running (install via [postgresapp.com](https://postgresapp.com) on Mac, or [postgresql.org/download](https://www.postgresql.org/download/) on Windows/Linux). Once it's running:

```bash
# create a database (name it whatever, just match .env)
createdb faj_prime_dev
```

Update `DATABASE_URL` in `.env` to match your local Postgres credentials, then:

```bash
npm run db:migrate    # creates all tables from prisma/schema.prisma
npm run db:generate   # generates the type-safe query client
```

`npm run db:studio` opens a visual browser at http://localhost:5555 where you can view/edit database rows without writing SQL — genuinely the easiest way to see what's in your database as a beginner.

### Run the server

```bash
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
**Section 2 — Database design** (schema defined in `prisma/schema.prisma`, covering
Listings, Agents, Projects, Services, Team, Testimonials, Blog Posts, Partners,
Contact Submissions, Inspection Bookings, Newsletter, and Admin Users).
