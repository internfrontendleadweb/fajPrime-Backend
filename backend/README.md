# FAJ Prime Estates — Backend API

Node.js + Express API and CMS backend for the FAJ Prime Estates website.
Pairs with the React/Vite frontend in `../frontend`.

## Stack

- **Runtime**: Node.js + Express
- **Database**: PostgreSQL (via Prisma ORM 7)
- **Auth**: JWT — added in Section 5

> **Note on Prisma 7**: This project uses Prisma's newest major version, which
> changed how the database URL is configured. It no longer lives in
> `prisma/schema.prisma` — it now lives in `prisma.config.mjs` at the backend
> root, and connecting to the database at runtime requires an explicit driver
> adapter (`@prisma/adapter-pg`), set up once in `src/config/db.js`. Both are
> already wired up here; you don't need to change anything, just know why
> those two files exist if you look inside them.

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
**Section 4 — Write endpoints** (`POST /api/contact`, `POST /api/inspections`,
`POST /api/newsletter` — all validated with Zod, rate-limited, honeypot spam
protection, and sending email notifications via Resend).

## Email notifications

Contact form and inspection bookings send two emails each: a notification to
`ADMIN_NOTIFICATION_EMAIL` and a confirmation to the person who submitted.

- Sign up free at [resend.com](https://resend.com), get an API key
- Without `RESEND_API_KEY` set, emails are just logged to the console instead
  of sent — safe default for local development, nothing breaks
- Resend's `onboarding@resend.dev` sender works without domain verification
  for testing; for production, verify your real domain in Resend's dashboard

## Spam protection on public forms

Every write endpoint (`/api/contact`, `/api/inspections`, `/api/newsletter`)
has two layers:
- **Rate limiting**: 5 submissions per 15 minutes per IP
- **Honeypot field**: include a `website` field in the request body that's
  hidden via CSS in the actual form (real visitors never see or fill it). If
  it arrives non-empty, the submission is silently faked as successful —
  nothing is saved, no email sent, and the bot gets no indication it was
  caught.
