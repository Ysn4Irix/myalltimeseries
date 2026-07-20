# Implementation Tasks

## Decisions

| Topic           | Decision                                                                |
| --------------- | ----------------------------------------------------------------------- |
| Package manager | Use Bun 1.3.14 and make Bun the only documented package manager.        |
| Deployment      | Use Dokploy's Node/Bun build flow. Do not use a custom Dockerfile path. |
| Admin auth      | Use simple bearer-token auth with `ADMIN_API_TOKEN`.                    |
| Tests           | Use Vitest only for now.                                                |
| Runtime env     | Move `MONGO_URL` to runtime env handling with `$env/dynamic/private`.   |

## Task Backlog

| ID  | Status    | Task                                                                                 | Depends On | Verification                                                                |
| --- | --------- | ------------------------------------------------------------------------------------ | ---------- | --------------------------------------------------------------------------- |
| T01 | Completed | Confirm Bun 1.3.14 works locally and document Bun as the only package manager.       | None       | `bun --version` reports `1.3.14`                                            |
| T02 | Completed | Remove npm/yarn/pnpm wording from docs and align scripts around Bun commands.        | T01        | `bun install --frozen-lockfile`                                             |
| T03 | Completed | Resolve lockfile policy: keep `bun.lockb` and treat npm lockfile as obsolete.        | T01        | Clean install succeeds                                                      |
| T04 | Completed | Change `MONGO_URL` from `$env/static/private` to `$env/dynamic/private`.             | T01        | Build works without build-time `MONGO_URL`                                  |
| T05 | Completed | Add runtime validation for missing `MONGO_URL`.                                      | T04        | App fails clearly or reports safe error when missing                        |
| T06 | Completed | Add runtime `ADMIN_API_TOKEN` access.                                                | T04        | Server-only `get_admin_api_token()` throws when `ADMIN_API_TOKEN` is absent |
| T07 | Completed | Replace `GET /api/add` with `POST /api/add`.                                         | T06        | `GET /api/add` no longer writes                                             |
| T08 | Completed | Require `Authorization: Bearer <ADMIN_API_TOKEN>` for `POST /api/add`.               | T07        | Missing/invalid token returns `401`                                         |
| T09 | Completed | Parse and validate JSON body for `name` and `poster`.                                | T07        | Invalid body returns `400`                                                  |
| T10 | Completed | Return `201` for successful series creation.                                         | T09        | Valid admin request creates record                                          |
| T11 | Completed | Remove or disable public `/api/seed`.                                                | T07        | `/api/seed` is unavailable or non-mutating                                  |
| T12 | Completed | Replace embedded JSON `status` fields with real HTTP status codes.                   | T07, T11   | API errors return correct HTTP status                                       |
| T13 | Completed | Stop returning raw internal error messages from API routes.                          | T12        | Server errors return generic `500` response                                 |
| T14 | Completed | Validate poster as a URL.                                                            | T09        | Invalid poster URL returns `400`                                            |
| T15 | Completed | Create server-only data helper for listing series.                                   | T12        | Page and API use helper                                                     |
| T16 | Completed | Create server-only data helper for creating series.                                  | T15        | Admin API uses helper                                                       |
| T17 | Completed | Normalize series serialization, including stable `id`.                               | T15        | UI receives stable ids                                                      |
| T18 | Completed | Replace duplicated Mongo list queries in page/API routes.                            | T15        | No duplicate raw query logic                                                |
| T19 | Completed | Add capped `limit` support for listing series.                                       | T15        | Large limits are rejected or capped                                         |
| T20 | Completed | Add cursor-based pagination using stable ordering.                                   | T19        | API returns bounded page and next cursor                                    |
| T21 | Completed | Update home page initial load to fetch only first page.                              | T20        | Initial payload is limited                                                  |
| T22 | Completed | Update “Load more” to fetch next page instead of slicing full collection.            | T21        | Infinite scroll loads additional records                                    |
| T23 | Completed | Add accessible label for GitHub repository link.                                     | None       | Screen reader label exists                                                  |
| T24 | Completed | Add accessible label and state semantics for theme toggle.                           | None       | Toggle has accessible name                                                  |
| T25 | Deferred  | Visible home page heading intentionally removed by product decision.                 | None       | Product decision documented                                                 |
| T26 | Completed | Use meaningful poster alt text.                                                      | None       | Card image alt uses series name                                             |
| T27 | Completed | Add lazy/async image loading and stable aspect ratio.                                | None       | Images reduce initial load cost                                             |
| T28 | Completed | Remove unused `data-sveltekit-noscroll` from list item.                              | None       | No dead attribute remains                                                   |
| T29 | Completed | Add Vitest dependency and test script.                                               | T01        | `bun run test` runs                                                         |
| T30 | Completed | Add tests for admin API auth failures.                                               | T08, T29   | Missing/invalid token tests pass                                            |
| T31 | Completed | Add tests for admin API validation failures.                                         | T09, T29   | Invalid input tests pass                                                    |
| T32 | Completed | Add tests for successful series creation helper/API behavior.                        | T16, T29   | Success test returns `201`                                                  |
| T33 | Completed | Add tests for list helper pagination behavior.                                       | T20, T29   | Pagination tests pass                                                       |
| T34 | Completed | Add Bun CI workflow for install, lint, check, test, and build.                       | T29        | CI passes                                                                   |
| T35 | Completed | Document Dokploy install command: `bun install --frozen-lockfile`.                   | T01        | README/deployment docs updated                                              |
| T36 | Completed | Document Dokploy build command: `bun run build`.                                     | T35        | Docs updated                                                                |
| T37 | Completed | Document Dokploy start command: `bun ./build/index.js`.                              | T36        | Docs updated                                                                |
| T38 | Completed | Document Dokploy env vars: `MONGO_URL`, `ADMIN_API_TOKEN`, `NODE_ENV`, `PORT`.       | T04, T06   | Docs updated                                                                |
| T39 | Completed | Update README with Bun setup, Mongo setup, admin API, tests, and Dokploy deployment. | T35-T38    | README is complete                                                          |
| T40 | Completed | Fill design/API documentation with current app structure and behavior.               | T39        | Docs describe data flow and API                                             |
| T41 | Completed | Plan dependency upgrades in small groups after CI and tests are stable.              | T34        | `docs/DEPENDENCY_UPGRADES.md` exists                                        |
| T42 | Completed | Upgrade dependencies incrementally, validating after each group.                     | T41        | `bun install --frozen-lockfile`, lint, check, test, and build pass          |
| T43 | Completed | Add reduced-motion handling for layout, card hover, and list item transitions.       | T23-T28    | Motion is disabled or avoided for users requesting reduced motion           |

## Recommended Execution Order

| Phase           | Tasks                               |
| --------------- | ----------------------------------- |
| Foundation      | T01-T06                             |
| Security        | T07-T14                             |
| Data layer      | T15-T18                             |
| Pagination      | T19-T22                             |
| Accessibility   | T23-T24, T26-T28, T43; T25 deferred |
| Tests           | T29-T33                             |
| CI              | T34                                 |
| Deployment/docs | T35-T40                             |
| Upgrades        | T41-T42                             |

## Recommendations

| Topic               | Recommendation                                                         |
| ------------------- | ---------------------------------------------------------------------- |
| Seed endpoint       | Delete `/api/seed` unless controlled seeding is still required.        |
| Poster validation   | Start with URL validation; add an allowlist later if abuse appears.    |
| Pagination strategy | Use cursor-based pagination on `_id` for stable newest-first loading.  |
| Missing `MONGO_URL` | Fail clearly on server startup/request instead of silently continuing. |

## Admin API Target Contract

`POST /api/add`

Headers:

```http
Authorization: Bearer <ADMIN_API_TOKEN>
Content-Type: application/json
```

Body:

```json
{
	"name": "Series Name",
	"poster": "https://example.com/poster.jpg"
}
```

Expected statuses:

| Case                      | Status |
| ------------------------- | ------ |
| Missing or invalid token  | `401`  |
| Missing or invalid fields | `400`  |
| Created                   | `201`  |
| Server/database failure   | `500`  |

## Runtime Environment

Required runtime variables:

```sh
MONGO_URL=...
ADMIN_API_TOKEN=...
NODE_ENV=production
PORT=3000
```

## Dokploy Commands

Install command:

```sh
bun install --frozen-lockfile
```

Build command:

```sh
bun run build
```

Start command:

```sh
bun ./build/index.js
```

## Verification Commands

Baseline verification:

```sh
bun install --frozen-lockfile
bun run lint
bun run check
bun run test
bun run build
```
