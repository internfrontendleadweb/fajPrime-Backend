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
**Section 11 — Deployment**. Section 12 (handover docs) is next, then the
admin CMS dashboard UI.

## Testing (Section 10)

```bash
npm test
```

Covers the most critical paths: the full auth flow (login, wrong password,
protected routes, logout), full admin CRUD on Listings (create, validation
rejection, invalid-enum rejection, update, delete, and confirming changes
show up on/disappear from the public read endpoint), and smoke tests across
every public read endpoint.

**Important: these tests run against whatever `DATABASE_URL` is in your
`.env`** — almost certainly your local dev database. They do **not** wipe
it. Each test creates its own uniquely-named records (a random suffix per
run) and cleans up exactly what it created afterward, so it's safe to run
against a database with real seeded content as many times as you like.

Tests run sequentially (not in parallel) since they share one real database
rather than mocking Prisma — a deliberate tradeoff of a little speed for
reliably reproducible results.

## Security hardening (Section 9)

- **Multi-origin CORS**: allows requests from `CLIENT_URL` (local dev) and
  `PUBLIC_SITE_URL` (your live frontend) simultaneously, not one or the
  other — plus anything extra in `ALLOWED_ORIGINS` (comma-separated, e.g.
  a future staging domain). Any other origin is rejected.
- **HTTP Parameter Pollution protection** (`hpp`) — strips duplicate query
  params like `?status=A&status=B` before they reach a controller.
- **XSS sanitization on public form input**: the Contact form and
  Inspection booking fields (name, subject, message, location, etc.) are
  stripped of any HTML/script tags on the way in, before ever touching
  the database. This is defense-in-depth — React already escapes text by
  default — but there's no reason to store raw `<script>` tags for a
  field that's supposed to be plain text.
- Error responses never leak stack traces (already true since Section 1 —
  confirmed still correct here)

## SEO & performance (Section 8)

- `GET /sitemap.xml` — dynamically generated from real database content
  (every listing, project, service, and blog post), so new content becomes
  crawlable automatically without editing a static file
- `GET /robots.txt` — points crawlers at the sitemap, disallows `/admin`
- **Gzip compression** on every response (via `compression`)
- **Cache-Control headers** on public content routes: 60s for
  listings/projects/blog (change often), 300s for services/team/
  testimonials/partners (change rarely)
- **General API rate limiter** (300 req/15min per IP) on public content
  routes, on top of the stricter limiters already on write/login endpoints

Set `PUBLIC_SITE_URL` in `.env` to your real frontend domain once it's live
(e.g. `https://fajprimeestates.com`) — this is what the sitemap uses to build
absolute URLs. Defaults to `http://localhost:5173` for local dev.

Note on structured data (JSON-LD/schema.org): that has to live in the
frontend's rendered HTML `<head>`, since search engines read served pages,
not this API's raw JSON — nothing to build here on the backend for that part.

## Image uploads (Section 7)

### One-time Cloudinary setup
1. Sign up free at [cloudinary.com](https://cloudinary.com) — no card required
2. Your **Dashboard** page (first thing you see after signup) shows three values: **Cloud Name**, **API Key**, **API Secret**
3. Paste them into `.env`:
   ```
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   ```
Without these set, `POST /api/admin/upload` returns a clear `503` telling you they're missing — nothing crashes.

### Endpoints
```
POST   /api/admin/upload              multipart/form-data, field name "image"
                                       optional field/query "folder": hero | projects | properties | partners | team | blog
                                       (unrecognized folder falls back to "misc")
DELETE /api/admin/upload/:publicId
```

`POST /api/admin/upload` returns:
```json
{ "url": "https://res.cloudinary.com/.../image.webp", "publicId": "faj-prime/properties/abc123", "width": 1600, "height": 1067 }
```
Take that `url` and use it as the `images`/`image`/`logo` field value when
creating or updating any content resource from Section 6.

### Limits
- Max file size: 8MB
- Accepted types: JPEG, PNG, WebP, AVIF
- Files are streamed directly to Cloudinary from memory — never saved to
  this server's disk (Render's filesystem is wiped on every redeploy anyway,
  so nothing would persist there regardless)
- Cloudinary auto-optimizes format/quality on delivery (`quality: auto`,
  `fetch_format: auto`) — no need to run the frontend's image-optimization
  script on admin-uploaded images

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

## Deployment (Section 11)

Two ways to do this — pick whichever you're more comfortable with. Both end
up in the exact same place.

### Option A: Render Blueprint (one step)
1. Push this repo to GitHub if it isn't already
2. Render dashboard → **New** → **Blueprint** → connect this repo
3. Render reads `render.yaml` (at the repo root) and creates both the
   database and web service automatically
4. Once created, go to the web service's **Environment** tab and add the
   variables listed at the bottom of `render.yaml` (JWT_SECRET, etc. — see
   below for what each one needs)

### Option B: Manual setup
**1. Create the database first:**
- Render dashboard → **New** → **PostgreSQL**
- Name it anything (e.g. `faj-prime-db`), free plan is fine to start
- Once created, copy the **Internal Database URL** shown on its page

**2. Create the web service:**
- Render dashboard → **New** → **Web Service** → connect this repo
- **Root Directory**: `backend`
- **Runtime**: Node
- **Build Command**: `npm install && npx prisma migrate deploy`
- **Start Command**: `npm start`
- **Health Check Path**: `/api/health`

**3. Set environment variables** (web service → **Environment** tab):

| Key | Value |
|---|---|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | the Internal Database URL from step 1 |
| `JWT_SECRET` | generate with `openssl rand -base64 32` — a real one, not the dev fallback |
| `PUBLIC_SITE_URL` | `https://fajprimeestates.com` (your real frontend domain) |
| `CLIENT_URL` | same as `PUBLIC_SITE_URL` in production (this var exists mainly for local dev, where it's `http://localhost:5173`) |
| `RESEND_API_KEY` | from resend.com |
| `EMAIL_FROM` | e.g. `FAJ Prime Estates <onboarding@resend.dev>` |
| `ADMIN_NOTIFICATION_EMAIL` | wherever your team should receive form notifications |
| `CLOUDINARY_CLOUD_NAME` | from your Cloudinary dashboard |
| `CLOUDINARY_API_KEY` | from your Cloudinary dashboard |
| `CLOUDINARY_API_SECRET` | from your Cloudinary dashboard |

Don't set `PORT` — Render provides this automatically, and `src/config/env.js`
already reads whatever value it's given.

**4. Create your first production admin.** Render's dashboard has a **Shell**
tab on the web service, once it's deployed:
```bash
npm run admin:create
```
Run this there (not on your local machine — this creates the admin in the
*production* database).

### How the build works
- `npm install` triggers `postinstall` automatically, which runs
  `prisma generate` — so the query client is always freshly generated on
  every deploy without a separate manual step
- `npx prisma migrate deploy` (part of the Build Command, not `migrate dev`)
  applies any pending migrations non-interactively — the production-safe
  equivalent of what `npm run db:migrate` does locally

### Known tradeoff: free tier cold starts
Render's free web service plan spins down after ~15 minutes of no traffic.
The first request after that idle period takes 30-60 seconds to wake back
up — expected free-tier behavior, not a bug. If that's a problem for a live
client demo, Render's paid "Starter" tier keeps it always-on.
