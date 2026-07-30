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
**Section 6, Batch 2 — Admin CMS backend, submissions management** (viewing
and managing Contact Submissions, Inspection Bookings, and Newsletter
Subscribers). Section 6 is now complete; Section 7 (Image uploads) is next.

## Managing submissions/bookings (Batch 2)

Unlike the content resources above, these are never created through the
admin API — they're created by visitors via the public forms (Section 4).
Admin can only view, update status, and delete.

```
GET    /api/admin/contact-submissions?status=NEW&page=1&limit=20
PATCH  /api/admin/contact-submissions/:id     { "status": "CONTACTED" }
DELETE /api/admin/contact-submissions/:id

GET    /api/admin/inspections?status=PENDING&page=1&limit=20
PATCH  /api/admin/inspections/:id             { "status": "CONFIRMED", "notes": "..." }
DELETE /api/admin/inspections/:id

GET    /api/admin/newsletter?page=1&limit=50
GET    /api/admin/newsletter/export.csv        (downloads a CSV of all subscribers)
DELETE /api/admin/newsletter/:id
```

Valid statuses:
- Contact: `NEW`, `CONTACTED`, `CLOSED`
- Inspection: `PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`

## Admin CMS endpoints

Every route below requires being logged in (see Authentication section
above) — no separate API key or header needed, just the session cookie set
by `/api/auth/login`.

Reading content still goes through the public routes from Section 3
(`GET /api/listings`, etc.) — the CMS UI reuses those for viewing/listing.
These new routes only handle creating, editing, and deleting:

```
POST   /api/admin/listings          PUT /api/admin/listings/:id       DELETE /api/admin/listings/:id
POST   /api/admin/projects          PUT /api/admin/projects/:id       DELETE /api/admin/projects/:id
POST   /api/admin/services          PUT /api/admin/services/:id       DELETE /api/admin/services/:id
POST   /api/admin/team              PUT /api/admin/team/:id           DELETE /api/admin/team/:id
POST   /api/admin/testimonials      PUT /api/admin/testimonials/:id   DELETE /api/admin/testimonials/:id
POST   /api/admin/blog              PUT /api/admin/blog/:id           DELETE /api/admin/blog/:id
POST   /api/admin/partners          PUT /api/admin/partners/:id       DELETE /api/admin/partners/:id
POST   /api/admin/agents            PUT /api/admin/agents/:id         DELETE /api/admin/agents/:id
```

Notes:
- **Slugs are auto-generated** from the title on create (e.g. "Luxury Duplex"
  → `luxury-duplex`), and auto-uniquified if that slug is already taken
  (`luxury-duplex-2`, etc.) — you can also pass your own `slug` field to
  override this.
- **Type/status/group fields** use the same human-readable strings as the
  public API ("Duplex", "For Sale", "board") — not the raw database enum
  names. An unrecognized value returns a clear 400 error naming the bad field.
- **Images are plain URL/path strings for now** (paste a path like
  `/images/properties/my-photo.webp`) — real file upload via Cloudinary is
  a later section.

## Authentication

Single admin role for now (no permission tiers yet). Auth uses a JWT stored
in an httpOnly cookie — the frontend never touches the token directly; the
browser sends it automatically on every request to this API.

**Create your first admin user:**
```bash
npm run admin:create
```
This prompts interactively for name, email, and password (min 8 characters) —
there's no public signup page on purpose, admin accounts are created
deliberately via this script, not self-registered.

**Required env var:**
```
JWT_SECRET=
```
Generate a real one with `openssl rand -base64 32` — never reuse this value
across projects, and never commit a real one to git.

**Endpoints:**
- `POST /api/auth/login` — `{ email, password }` → sets session cookie
- `POST /api/auth/logout` — clears the session cookie
- `GET /api/auth/me` — returns the logged-in admin's info (401 if not logged in)

Login is rate-limited (10 attempts / 15 min per IP) since it's the most
common brute-force target on any site with an admin panel.

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
