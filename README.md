# Netflix Clone (learning project)

A functional, medium-sized Netflix-style streaming app: React + Vite
frontend, Express + Sequelize (MySQL) backend, cookie-based JWT auth,
watchlist, subscriptions, and a simulated payment flow.

Architecture follows the Todo project's skeleton throughout:

```
Route → Controller → Service → Model → Database
```

See `netflix-clone-project-plan.md` (shared separately) for the full
rationale, D&P-repo recycling notes, and phase breakdown this was built
against.

Status: **Phases 1–11 complete** (foundation → auth → movies/shows →
details/watch → search → my list → profile → subscription/payment).
**Phase 12 (UI polish) and Phase 13 (cinematic landing page) are not yet
built**, per the project rule that the landing page comes last.

## Prerequisites

- Node.js 18+
- Docker (for MySQL)

## 1. Start the database

```bash
cd docker
docker compose up -d
```

This starts MySQL on `localhost:3306` and phpMyAdmin on `localhost:8080`.

## 2. Backend

```bash
cd backend
cp .env.example .env      # adjust if you changed docker-compose credentials
npm install
npm run db:seed           # creates tables + demo movies/shows/episodes/categories
npm run dev                # http://localhost:4000
```

Verify it's alive: `curl http://localhost:4000/api/health`

## 3. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev                # http://localhost:5173
```

Register a new account, then browse — Home/Movies/Shows/Search/My
List/Profile/Subscription/Payment are all wired to the real API.

## 4. Testing the API independently (Postman)

Import `postman/netflix-clone.postman_collection.json` and
`postman/netflix-clone.postman_environment.json`. Run **Auth - Register**
or **Auth - Login** first — Postman will store the session cookie
automatically for subsequent requests (make sure "Automatically follow
redirects" and cookie jar are on, which is Postman's default).

## Notes

- All movie/show poster, backdrop, and video fields point at placeholder
  media (placehold.co images, a public-domain MDN sample video) — no
  licensed Netflix content is used anywhere, per the project's legal
  constraint.
- Passwords are hashed with bcrypt; sessions are httpOnly JWT cookies —
  never read the auth token from client-side JS.
- No real payment data is ever collected; `POST /api/payments` is a stub
  that always succeeds and activates the subscription, for demonstration
  only.
- `sequelize.sync()` is used for schema creation (not sequelize-cli
  migrations) to keep the "don't over-engineer" scope — swap to real
  migrations in `backend/migrations/` later if you want migration history.

## What's next (Phases 12–13, not started)

- Responsive breakpoints, loading skeletons, hover-preview on cards,
  transitions.
- The cinematic landing page (`Landing.jsx`), shown only to logged-out
  visitors, built last so it doesn't complicate the core app architecture.
