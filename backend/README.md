# FAJ Prime Estates — Backend

Node.js + Express + PostgreSQL API and CMS backend for the FAJ Prime Estates
real estate website. Built section by section; this doc is the handover
reference for whoever maintains it next (including future-you).

**Live**: https://faj-prime-api.onrender.com
**Repo history note**: this repo originally held both frontend and backend
as a monorepo. The frontend now lives in its own separate repo — see the
root `README.md` for the reconnection plan for whenever the two need wiring
together for real.

## Contents
- [Tech stack](#tech-stack)
- [Quick start (local dev)](#quick-start-local-dev)
- [Project structure](#project-structure)
- [Environment variables](#environment-variables)
- [Database](#database)
- [Authentication](#authentication)
- [API reference](#api-reference)
- [Image uploads](#image-uploads)
- [Email notifications](#email-notifications)
- [Security](#security)
- [SEO & performance](#seo--performance)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting — real issues we hit](#troubleshooting--real-issues-we-hit)
- [What's built / what's next](#whats-built--whats-next)

---

## Tech stack

- **Runtime**: Node.js + Express
- **Database**: PostgreSQL via Prisma ORM 7
- **Auth**: JWT in an httpOnly cookie (single admin role, no tiers yet)
- **Validation**: Zod
- **Images**: Cloudinary
- **Email**: Resend
- **Tests**: Vitest + supertest

> **Prisma 7 note**: this project uses Prisma's newest major version, which
> changed how the database connects. The URL no longer lives in
> `prisma/schema.prisma` — it's in `prisma.config.mjs` at the backend root,
> and runtime connections need an explicit driver adapter (`@prisma/adapter-pg`),
> wired up once in `src/config/db.js`. Already set up; just know why those
> two files exist if you're wondering.

## Quick start (local dev)

```bash
cd backend
npm install
cp .env.example .env
```

You need a local PostgreSQL running (via [postgresapp.com](https://postgresapp.com)
on Mac, or [postgresql.org/download](https://www.postgresql.org/download/)
elsewhere). Then:

```bash
createdb faj_prime_dev
# edit .env's DATABASE_URL to match your local Postgres credentials
npm run db:migrate      # creates all tables
npm run db:generate     # generates the query client
npm run db:seed         # populates real sample content
npm run admin:create    # creates your first admin login
npm run dev             # starts the server on :4000
```

Verify it's alive: `curl http://localhost:4000/api/health`

`npm run db:studio` opens a visual database browser at localhost:5555 —
the easiest way to look at your data without writing SQL.

## Project structure

```
backend/
├── src/
│   ├── config/        # env loading, database client, Cloudinary
│   ├── controllers/    # request handling logic per resource
│   ├── routes/         # Express route definitions per resource
│   ├── middleware/      # auth, error handling, validation, rate limiting, caching
│   ├── utils/            # slugify, JWT, email, sanitization, serializers, enum mapping
│   ├── validation/        # Zod schemas
│   ├── app.js             # Express app setup (middleware + routes) — no .listen() here
│   └── server.js          # actually starts the HTTP server
├── prisma/
│   ├── schema.prisma       # the data model
│   ├── migrations/          # migration history
│   ├── seed.js               # populates real sample content
│   └── createAdmin.js         # interactive first-admin script
├── tests/                      # Vitest + supertest
├── API.md                       # full endpoint reference
├── .env.example
└── package.json
```

## Environment variables

Copy `.env.example` to `.env` and fill in. Full reference:

| Variable | Required? | Notes |
|---|---|---|
| `PORT` | No | Render sets this automatically in production |
| `NODE_ENV` | Yes | `development` or `production` |
| `DATABASE_URL` | Yes | Postgres connection string. **External Render connections need `?sslmode=require` appended** |
| `CLIENT_URL` | Yes | Your frontend's origin — `http://localhost:5173` locally, your real domain in production |
| `ADMIN_URL` | Yes | Your separate admin dashboard origin — `http://localhost:5174` locally, its real deployed domain in production |
| `PUBLIC_SITE_URL` | Yes | Your real live frontend domain (used for sitemap URLs + allowed as a CORS origin alongside `CLIENT_URL`) |
| `ALLOWED_ORIGINS` | No | Comma-separated extra CORS origins (e.g. a staging domain) |
| `JWT_SECRET` | Yes | Generate with `openssl rand -base64 32`. Never reuse across projects |
| `JWT_EXPIRES_IN` | No | Defaults to `7d` |
| `RESEND_API_KEY` | No | Without it, emails just log to console instead of sending — safe default |
| `EMAIL_FROM` | No | Defaults to Resend's test sender; needs domain verification to use a real address |
| `ADMIN_NOTIFICATION_EMAIL` | No | Where your team receives form notifications |
| `CLOUDINARY_CLOUD_NAME` / `_API_KEY` / `_API_SECRET` | No | Without them, upload endpoint returns a clear `503` rather than crashing |

## Database

Schema lives in `prisma/schema.prisma` — 12 models: `Listing`, `Agent`,
`Project`, `Service`, `TeamMember`, `Testimonial`, `BlogPost`, `Partner`,
`ContactSubmission`, `InspectionBooking`, `NewsletterSubscriber`, `AdminUser`.

- `npm run db:migrate` — local dev, interactive, creates new migrations as the schema changes
- `npm run db:migrate:deploy` — production-safe, non-interactive, just applies pending migrations (this is what Render's build runs)
- `npm run db:seed` — populates real sample content (safe to re-run, uses upserts)

## Authentication

Single admin role for now. JWT in an httpOnly cookie — the frontend never
touches the token directly, the browser sends it automatically.

```bash
npm run admin:create   # interactive: name, email, password (min 8 chars)
```
No public signup route exists on purpose.

See [API reference](#api-reference) for the actual endpoints.

## API reference

Full endpoint-by-endpoint reference with request/response examples lives in
**[API.md](./API.md)** — covers every public read/write endpoint, auth, and
every admin CMS endpoint across all 8 content resources plus submissions
management and image uploads.

## Image uploads

Real file upload via Cloudinary (`POST /api/admin/upload`), replacing
"paste a URL." Sign up free at [cloudinary.com](https://cloudinary.com) (no
card required), grab your **Cloud Name / API Key / API Secret** from the
Dashboard, paste into `.env`. Max 8MB, JPEG/PNG/WebP/AVIF only, streamed
directly to Cloudinary from memory (never touches this server's disk).

## Email notifications

Contact form + inspection bookings each send two emails: a notification to
`ADMIN_NOTIFICATION_EMAIL` and a confirmation to whoever submitted. Sign up
free at [resend.com](https://resend.com). Without `RESEND_API_KEY` set,
emails just log to console — nothing breaks in local dev without one.

## Security

- **Multi-origin CORS**: allows `CLIENT_URL` + `PUBLIC_SITE_URL` simultaneously (local dev and live domain both work at once), plus anything in `ALLOWED_ORIGINS`. Anything else gets a `403`.
- **Rate limiting**: 5/15min on public forms, 10/15min on login, 300/15min general on public reads
- **Honeypot spam protection** on all 3 public forms
- **XSS sanitization** on public form free-text fields (stripped before touching the database)
- **HTTP Parameter Pollution protection** (`hpp`)
- Error responses never leak stack traces

## SEO & performance

- `GET /sitemap.xml` — dynamically built from real database content, always current
- `GET /robots.txt`
- Gzip compression on every response
- `Cache-Control` headers on public content routes (60s frequently-changing, 300s rarely-changing)

Structured data (JSON-LD) has to live in the frontend's rendered HTML —
search engines read served pages, not this API's JSON — nothing to build
here for that part.

## Testing

```bash
npm test
```
Vitest + supertest, covering the full auth flow, complete admin CRUD on
Listings, and smoke tests across every public read endpoint. Runs against
your real `DATABASE_URL` (not mocked) but never wipes it — each test
creates uniquely-suffixed records and cleans up exactly what it created.
Safe to run repeatedly against a database with real content.

## Deployment

Live on Render. Two paths, both end up the same place:

**Blueprint (one step)**: push to GitHub → Render dashboard → New → Blueprint
→ connect repo → Render reads `render.yaml` (repo root) and creates the
database + web service together. Then add the env vars manually (see below).

**Manual**: create a Postgres instance first, then a Web Service with
Root Directory `backend`, Build Command `npm install && npx prisma migrate deploy`,
Start Command `npm start`, Health Check Path `/api/health`.

Either way, set every environment variable from the table above in the web
service's **Environment** tab (Render pre-fills `DATABASE_URL` if you used
the Blueprint and linked its own database).

**Creating the production admin**: Render's Shell tab requires the paid
Starter plan. On the free tier, run it from your own machine instead,
pointed at production just for that one command:
```bash
DATABASE_URL="<External Database URL from Render's DB dashboard>?sslmode=require" npm run db:seed
DATABASE_URL="<same URL>" npm run admin:create
```
Get the exact "External Database URL" from the database's own Render
dashboard page — don't hand-construct it, small differences (Render often
appends random suffixes to names) cause auth failures that look like wrong
credentials.

**Cold starts**: Render's free tier spins down after ~15 min idle; first
request after that takes 30-60s to wake up. Expected, not a bug. Paid
"Starter" tier stays always-on.

## Troubleshooting — real issues we hit

These are actual problems encountered building and deploying this project,
kept here because they'll very likely recur for whoever works on this next.

**`Cannot find module 'PrismaClient'` / `@prisma/client` errors**
→ Run `npm run db:generate` (or just `npm install`, which now runs it
automatically via `postinstall`). This generates the actual query client
from your schema — a fresh `npm install` alone doesn't do this on its own
in every Prisma version.

**`injected env (0) from .env` in the logs, followed by anything failing**
→ `.env` is missing or empty. It's git-ignored on purpose (holds secrets),
so it never travels with `git pull`, a zip, or a fresh clone. Always
`cp .env.example .env` and fill in real values on any new checkout.

**"Drift detected" / migration errors after pulling new code**
→ Usually means `prisma/migrations/` and your actual database structure
disagree. If it's your local dev database (disposable, reseedable):
```bash
npx prisma migrate reset   # drops everything, reapplies migrations fresh
npm run db:seed
```

**Render Postgres: `User was denied access on the database (not available)`**
→ External connections to Render Postgres require SSL. Append
`?sslmode=require` to the connection string.

**Duplicate keys in `package.json` (or any JSON)**
→ JSON silently keeps only the *last* occurrence of a duplicate key with no
warning. If a script "isn't working" despite looking correct, check for a
leftover duplicate key elsewhere in the file.

**Git "divergent branches" after someone else touched the same repo**
→ `git diff main origin/main --stat` first to see what actually changed
before merging anything. If it's just cosmetic (formatting/comments) with
no real logic differences, `git config pull.rebase false && git pull origin main -X ours`
resolves conflicts by keeping your side automatically.

**CORS rejecting your own live domain**
→ Check that `PUBLIC_SITE_URL` (or `CLIENT_URL`) is actually set to your
real domain in that environment's `.env` / Render env vars — it defaults to
`localhost:5173` if unset, which silently excludes your real domain from
the allowlist.

## What's built / what's next

**Built**: project scaffolding, database design, public read API, public
write API (contact/inspection/newsletter), JWT authentication, full admin
CMS (CRUD on 8 content resources + submissions management), image uploads,
SEO/performance, security hardening, automated tests, production deployment.

**Not yet built**: the admin CMS *dashboard UI* itself (this backend is
ready for one — every endpoint above is what it would call), password
reset/change for admins, multi-role permissions (currently single role).
