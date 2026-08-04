# FAJ Prime Estates — API Reference

Base URL: `http://localhost:4000` (local dev) or your Render URL in production.
All request/response bodies are JSON unless noted otherwise.

## Conventions

- **Enums use human-readable strings**, not raw database values — e.g. a
  listing's `type` is `"Duplex"`, not `DUPLEX`; `status` is `"For Sale"`, not
  `FOR_SALE`. This applies consistently to both reading and writing.
- **Auth**: admin routes require a valid session cookie (set automatically by
  `POST /api/auth/login`). There is no API key or Bearer token — just log in
  once and the browser handles the rest.
- **Pagination**: endpoints that return a list of many items respond with
  `{ data: [...], meta: { total, page, limit, totalPages } }`. Endpoints
  returning a small/bounded set (services, team, testimonials, partners)
  just return a plain array.
- **Errors**: `{ "error": "message" }`, or for validation failures,
  `{ "error": "Validation failed", "details": [{ "field": "...", "message": "..." }] }`.

---

## Public read endpoints

No auth required. Cached (`Cache-Control`) and rate-limited (300 req/15min/IP).

| Method | Path | Filters |
|---|---|---|
| GET | `/api/listings` | `location`, `type`, `status`, `bedrooms` (min), `minPrice`, `maxPrice`, `query` (search), `featured`, `page`, `limit` |
| GET | `/api/listings/:slug` | — |
| GET | `/api/listings/agents` | — (all agents, for the "listed by" lookup) |
| GET | `/api/projects` | `status` |
| GET | `/api/projects/:slug` | — |
| GET | `/api/services` | — |
| GET | `/api/services/:slug` | — |
| GET | `/api/team` | `group` (`board` or `management`) |
| GET | `/api/testimonials` | — |
| GET | `/api/blog` | `category`, `page`, `limit` |
| GET | `/api/blog/:slug` | — |
| GET | `/api/partners` | — |
| GET | `/api/health` | — (uptime check) |
| GET | `/sitemap.xml` | — (dynamic, real content) |
| GET | `/robots.txt` | — |

## Public write endpoints (forms)

No auth required. Rate-limited (5 req/15min/IP) and honeypot-protected —
include an empty `website` field in the body; if a bot fills it, the
response fakes success without saving anything.

### `POST /api/contact`
```json
{ "name": "Jane Doe", "email": "jane@example.com", "phone": "+234...", "subject": "Inquiry", "message": "..." }
```
→ `201 { "success": true, "id": "..." }`

### `POST /api/inspections`
```json
{
  "fullName": "Jane Doe", "email": "jane@example.com", "phone": "+234...",
  "location": "Lekki, Lagos", "preferredDate": "2026-08-15", "preferredTime": "10:00 AM",
  "property": "luxury-5-bedroom-fully-detached-duplex-ikoyi", "inspectionType": "Private Viewing",
  "message": "..."
}
```
`property` is a **listing slug**, resolved server-side to the actual listing ID.
→ `201 { "success": true, "id": "..." }`

### `POST /api/newsletter`
```json
{ "email": "jane@example.com" }
```
→ `201 { "success": true, "id": "..." }` or `200 { "success": true, "alreadySubscribed": true }` if already subscribed.

---

## Authentication

### `POST /api/auth/login`
```json
{ "email": "admin@example.com", "password": "..." }
```
→ `200 { "success": true, "admin": { "id", "name", "email", "role" } }` + sets session cookie
→ `401 { "error": "Invalid email or password" }` (same message for wrong email OR wrong password — no account enumeration)

### `POST /api/auth/logout`
→ `200 { "success": true } `, clears the cookie

### `GET /api/auth/me`
Requires session cookie.
→ `200 { "admin": { "id", "name", "email", "role" } }` or `401` if not logged in

Rate-limited: 10 login attempts / 15 min / IP.

---

## Admin CMS endpoints

**All require a valid session cookie.** Reading still goes through the
public endpoints above — these only create/edit/delete.

### Content resources
Each of the 8 resources below follows the identical pattern:
```
POST   /api/admin/<resource>          create
PUT    /api/admin/<resource>/:id      update (partial — only send fields you're changing)
DELETE /api/admin/<resource>/:id      delete
```
Resources: `listings`, `projects`, `services`, `team`, `testimonials`, `blog`, `partners`, `agents`.

Notes:
- `slug` auto-generates from `title` if omitted (and auto-uniquifies on collision)
- `type`/`status`/`group` fields use the same display strings as public reads (`"Duplex"`, not `"DUPLEX"`) — an unrecognized value returns `400` naming the field
- Images/logos are plain URL strings — get one from `POST /api/admin/upload` first, then use the returned `url` here

**Example — create a listing:**
```json
POST /api/admin/listings
{
  "title": "Luxury 5-Bedroom Duplex",
  "type": "Duplex", "status": "For Sale",
  "price": 850000000, "location": "Ikoyi, Lagos",
  "bedrooms": 5, "bathrooms": 6, "sqm": 620,
  "description": "...",
  "amenities": ["Pool", "BQ"],
  "images": ["https://res.cloudinary.com/.../photo.webp"]
}
```
→ `201` with the created record (slug auto-generated as `luxury-5-bedroom-duplex`)

### Submissions & bookings (view/manage only — never created here)
```
GET    /api/admin/contact-submissions?status=NEW&page=1&limit=20
PATCH  /api/admin/contact-submissions/:id     { "status": "CONTACTED" }
DELETE /api/admin/contact-submissions/:id

GET    /api/admin/inspections?status=PENDING&page=1&limit=20
PATCH  /api/admin/inspections/:id             { "status": "CONFIRMED", "notes": "..." }
DELETE /api/admin/inspections/:id

GET    /api/admin/newsletter?page=1&limit=50
GET    /api/admin/newsletter/export.csv        (downloads a CSV file)
DELETE /api/admin/newsletter/:id
```
Contact statuses: `NEW`, `CONTACTED`, `CLOSED`.
Inspection statuses: `PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`.

### Image upload
```
POST   /api/admin/upload      multipart/form-data, field "image", optional field "folder"
DELETE /api/admin/upload/:publicId
```
`folder` must be one of: `hero`, `projects`, `properties`, `partners`, `team`, `blog` (else falls back to `misc`).
→ `201 { "url", "publicId", "width", "height" }`
Max 8MB, JPEG/PNG/WebP/AVIF only.

---

## Full data shapes by resource

### Listing
```json
{
  "id", "slug", "title",
  "type": "Apartment | Duplex | Terrace | Land | Commercial",
  "status": "For Sale | For Rent | Off-Plan | Sold | Rented",
  "price", "currency", "location", "bedrooms", "bathrooms", "parking", "sqm",
  "featured", "agent": "<agent id>", "description", "amenities": [], "images": []
}
```

### Project
```json
{
  "id", "slug", "title",
  "status": "past | current | future",
  "location", "progress": "0-100", "completionDate", "propertyType", "units",
  "description", "amenities": [], "images": []
}
```

### Service
```json
{ "id", "slug", "title", "icon", "shortDescription", "benefits": [], "process": [], "faqs": [{ "q", "a" }] }
```

### TeamMember
```json
{ "id", "group": "board | management", "name", "role", "bio", "image", "linkedin", "order" }
```

### Testimonial
```json
{ "id", "name", "location", "rating": "1-5", "review", "image" }
```

### BlogPost
```json
{ "id", "slug", "category", "title", "date": "YYYY-MM-DD", "readTime", "author", "image", "excerpt", "content" }
```

### Partner
```json
{ "id", "name", "logo" }
```

### Agent
```json
{ "id", "name", "role", "phone", "email" }
```
