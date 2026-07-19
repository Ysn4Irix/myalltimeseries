# Implementation Tasks

## Decisions

| Topic | Decision |
| --- | --- |
| Package manager | Use latest Bun and make Bun the only documented package manager. |
| Deployment | Use Dokploy's Node/Bun build flow. Do not use a custom Dockerfile path. |
| Admin auth | Use simple bearer-token auth with `ADMIN_API_TOKEN`. |
| Tests | Use Vitest only for now. |
| Runtime env | Move `MONGO_URL` to runtime env handling with `$env/dynamic/private`. |

## Task Backlog

| ID | Task | Depends On | Verification |
| --- | --- | --- | --- |
| T01 | Confirm latest Bun works locally and document Bun as the only package manager. | None | `bun --version` |
| T02 | Remove npm/yarn/pnpm wording from docs and align scripts around Bun commands. | T01 | `bun install --frozen-lockfile` |
| T03 | Resolve lockfile policy: keep `bun.lockb` and treat npm lockfile as obsolete. | T01 | Clean install succeeds |
| T04 | Change `MONGO_URL` from `$env/static/private` to `$env/dynamic/private`. | T01 | Build works without build-time `MONGO_URL` |
| T05 | Add runtime validation for missing `MONGO_URL`. | T04 | App fails clearly or reports safe error when missing |
| T06 | Add runtime `ADMIN_API_TOKEN` access. | T04 | Missing token blocks admin write |
| T07 | Replace `GET /api/add` with `POST /api/add`. | T06 | `GET /api/add` no longer writes |
| T08 | Require `Authorization: Bearer <ADMIN_API_TOKEN>` for `POST /api/add`. | T07 | Missing/invalid token returns `401` |
| T09 | Parse and validate JSON body for `name` and `poster`. | T07 | Invalid body returns `400` |
| T10 | Return `201` for successful series creation. | T09 | Valid admin request creates record |
| T11 | Remove or disable public `/api/seed`. | T07 | `/api/seed` is unavailable or non-mutating |
| T12 | Replace embedded JSON `status` fields with real HTTP status codes. | T07, T11 | API errors return correct HTTP status |
| T13 | Stop returning raw internal error messages from API routes. | T12 | Server errors return generic `500` response |
| T14 | Validate poster as a URL. | T09 | Invalid poster URL returns `400` |
| T15 | Create server-only data helper for listing series. | T12 | Page and API use helper |
| T16 | Create server-only data helper for creating series. | T15 | Admin API uses helper |
| T17 | Normalize series serialization, including stable `id`. | T15 | UI receives stable ids |
| T18 | Replace duplicated Mongo list queries in page/API routes. | T15 | No duplicate raw query logic |
| T19 | Add capped `limit` support for listing series. | T15 | Large limits are rejected or capped |
| T20 | Add cursor-based pagination using stable ordering. | T19 | API returns bounded page and next cursor |
| T21 | Update home page initial load to fetch only first page. | T20 | Initial payload is limited |
| T22 | Update “Load more” to fetch next page instead of slicing full collection. | T21 | Button loads additional records |
| T23 | Add accessible label for GitHub repository link. | None | Screen reader label exists |
| T24 | Add accessible label and state semantics for theme toggle. | None | Toggle has accessible name |
| T25 | Add visible page heading on the home page. | None | Page has `<h1>` |
| T26 | Use meaningful poster alt text. | None | Card image alt uses series name |
| T27 | Add lazy/async image loading and stable aspect ratio. | None | Images reduce initial load cost |
| T28 | Remove unused `data-sveltekit-noscroll` from list item. | None | No dead attribute remains |
| T29 | Add Vitest dependency and test script. | T01 | `bun run test` runs |
| T30 | Add tests for admin API auth failures. | T08, T29 | Missing/invalid token tests pass |
| T31 | Add tests for admin API validation failures. | T09, T29 | Invalid input tests pass |
| T32 | Add tests for successful series creation helper/API behavior. | T16, T29 | Success test returns `201` |
| T33 | Add tests for list helper pagination behavior. | T20, T29 | Pagination tests pass |
| T34 | Add Bun CI workflow for install, lint, check, test, and build. | T29 | CI passes |
| T35 | Document Dokploy install command: `bun install --frozen-lockfile`. | T01 | README/deployment docs updated |
| T36 | Document Dokploy build command: `bun run build`. | T35 | Docs updated |
| T37 | Document Dokploy start command: `bun ./build/index.js`. | T36 | Docs updated |
| T38 | Document Dokploy env vars: `MONGO_URL`, `ADMIN_API_TOKEN`, `NODE_ENV`, `PORT`. | T04, T06 | Docs updated |
| T39 | Update README with Bun setup, Mongo setup, admin API, tests, and Dokploy deployment. | T35-T38 | README is complete |
| T40 | Fill design/API documentation with current app structure and behavior. | T39 | Docs describe data flow and API |
| T41 | Plan dependency upgrades in small groups after CI and tests are stable. | T34 | Upgrade checklist exists |
| T42 | Upgrade dependencies incrementally, validating after each group. | T41 | `bun run lint && bun run check && bun run test && bun run build` passes |

## Recommended Execution Order

| Phase | Tasks |
| --- | --- |
| Foundation | T01-T06 |
| Security | T07-T14 |
| Data layer | T15-T18 |
| Pagination | T19-T22 |
| Accessibility | T23-T28 |
| Tests | T29-T33 |
| CI | T34 |
| Deployment/docs | T35-T40 |
| Upgrades | T41-T42 |

## Recommendations

| Topic | Recommendation |
| --- | --- |
| Seed endpoint | Delete `/api/seed` unless controlled seeding is still required. |
| Poster validation | Start with URL validation; add an allowlist later if abuse appears. |
| Pagination strategy | Use cursor-based pagination on `_id` for stable newest-first loading. |
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

| Case | Status |
| --- | --- |
| Missing or invalid token | `401` |
| Missing or invalid fields | `400` |
| Created | `201` |
| Server/database failure | `500` |

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
bun run build
```

After Vitest is added:

```sh
bun run test
```
