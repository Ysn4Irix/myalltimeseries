# Project Audit

## Scope

Read-only audit of the existing SvelteKit project. No files were modified during the audit. No build/check commands were run during the audit because they may generate or mutate `.svelte-kit` or build artifacts.

## Product Summary

The project is a personal/public catalog of watched TV shows.

Current user flows:

| Flow | Evidence |
| --- | --- |
| View all series on `/` | `src/routes/+page.server.js:5-19`, `src/routes/+page.svelte:17-39` |
| Load more cards client-side | `src/routes/+page.svelte:8`, `src/routes/+page.svelte:32-36` |
| Toggle light/night theme | `src/routes/+layout.svelte:4`, `src/routes/+layout.svelte:18-20`, `src/routes/+layout.svelte:41-43` |
| View total count in header | `src/routes/+layout.server.js:5-8`, `src/routes/+layout.svelte:34-38` |
| Read all series via API | `src/routes/api/all/+server.js:9-35` |
| Add a series via API | `src/routes/api/add/+server.js:8-37` |

## Architecture Summary

| Area | Current State |
| --- | --- |
| Framework | SvelteKit with Svelte 3 |
| Styling | Tailwind CSS and DaisyUI |
| Database | MongoDB driver with module-level client and collection exports |
| Server routes | SvelteKit server load functions and API routes |
| Deployment target | Dokploy Node/Bun build flow |
| Tests | No test files or test script found |
| CI/CD | Tag-only release workflow, no PR/push validation |

## Confirmed Findings

| ID | Area | Evidence | Problem | Impact | Recommended Improvement | Risk | Effort | Priority | Dependencies |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CF-01 | Security | `src/routes/api/add/+server.js:8-23` | Public unauthenticated `GET /api/add` writes directly to MongoDB. | Anyone who can reach the endpoint can add arbitrary records. Crawlers or previews could mutate data. | Replace with authenticated admin-only `POST` using `Authorization: Bearer <ADMIN_API_TOKEN>`. | High | Medium | P0 | Add `ADMIN_API_TOKEN` runtime env. |
| CF-02 | Security | `src/routes/api/add/+server.js:12-17` | Validation uses `if (!name && !poster)`, so records can be inserted with only one field. | Broken cards, bad data, and possible downstream rendering issues. | Require both fields, validate string length, and validate URL format for `poster`. | Medium | Small | P0 | None. |
| CF-03 | Security | `src/routes/api/add/+server.js:31-35`, `src/routes/api/all/+server.js:28-33`, `src/routes/api/seed/+server.js:25-30` | Raw error messages are returned to clients. | Database or runtime details may leak publicly. | Return generic client errors and log full details server-side. | Medium | Small | P1 | Logging approach. |
| CF-04 | Security | `src/routes/api/add/+server.js:20-23`, `src/lib/components/Card.svelte:7` | Arbitrary poster URLs are stored and rendered as images. | Enables third-party tracking pixels, broken content, or abusive remote resources. | Validate poster URLs and optionally allowlist trusted poster hosts. | Medium | Medium | P1 | Product decision on poster source. |
| CF-05 | Performance | `src/routes/+page.server.js:5-15`, `src/routes/+page.svelte:21`, `src/routes/+page.svelte:32-36` | Home page loads the full collection, then slices client-side. | Page payload and DB work grow linearly as the catalog grows. | Add server-side pagination or cursor-based loading. | Medium | Medium | P1 | API/query contract for pagination. |
| CF-06 | Performance | `src/routes/api/all/+server.js:11-21` | `/api/all` returns the entire collection without limit or pagination. | Large responses can degrade API latency and bandwidth. | Add `limit`, cursor/page parameters, and safe maximum limits. | Medium | Medium | P1 | API compatibility decision. |
| CF-07 | Performance | `src/routes/+layout.server.js:5` | `countDocuments()` runs on every layout server load. | Extra database query on every page request. | Cache count briefly, return it with page data, or use estimated count if exactness is not required. | Low | Small | P2 | Decide freshness requirement. |
| CF-08 | Performance | `src/lib/components/Card.svelte:7` | Images lack `loading="lazy"`, dimensions, and decoding hints. | Slower initial loads and potential layout shift. | Add lazy loading, width/height or aspect-ratio, and `decoding="async"`. | Low | Small | P2 | Know poster dimensions or use fixed aspect ratio. |
| CF-09 | Accessibility | `src/routes/+layout.svelte:23-33` | SVG-only GitHub link has no accessible name. | Screen reader users cannot identify the link. | Add `aria-label="GitHub repository"` or visually hidden text. | Medium | Small | P1 | None. |
| CF-10 | Accessibility | `src/routes/+layout.svelte:41-43` | Theme toggle checkbox has no accessible label. | Assistive tech users cannot understand the control. | Add visible text, `aria-label`, or associated label text. | Medium | Small | P1 | None. |
| CF-11 | Accessibility | `src/lib/components/Card.svelte:7` | Image alt text is generic: `alt="series"`. | Screen reader output is repetitive and unhelpful. | Use the series name as alt text, or empty alt if poster is decorative. | Low | Small | P2 | Decide whether poster conveys content. |
| CF-12 | Accessibility | `src/routes/+page.svelte:17-39` | Main content has no visible heading structure. | Navigation and page context are weaker for assistive tech and SEO. | Add an `<h1>` for the catalog page. | Low | Small | P2 | Content wording. |
| CF-13 | Usability | `src/routes/+layout.svelte:4`, `src/routes/+layout.svelte:43` | Theme choice is local component state only. | User preference resets on refresh/navigation lifecycle. | Persist theme in local storage or cookie and initialize before paint. | Low | Small | P3 | Decide default/system theme behavior. |
| CF-14 | Correctness | `src/routes/+page.svelte:21-27`, `src/routes/+page.server.js:9-10`, `src/routes/api/add/+server.js:20-23` | UI destructures `id`, but server query removes `_id`, and add endpoint inserts no `id`. | List items may have missing DOM ids and cannot be keyed by stable identity. | Return a stable string id or use a real keyed each block with a guaranteed field. | Medium | Small | P1 | Decide data shape for existing Mongo records. |
| CF-15 | Error Handling | `src/routes/api/add/+server.js:13-17`, `src/routes/api/add/+server.js:31-35`, `src/routes/api/all/+server.js:29-33` | API responses embed `status` in JSON but do not set HTTP status codes. | Clients, caches, and monitoring see failures as HTTP 200. | Use `json(body, { status })` with proper 4xx/5xx codes. | Medium | Small | P1 | API compatibility decision. |
| CF-16 | Error Handling | `src/hooks.server.js:3-9` | Mongo connection failure is logged but app startup continues. | App can run in a broken state with runtime DB failures. | Fail fast during startup or expose a clear degraded/health state. | Medium | Small | P1 | Deployment/runtime expectations. |
| CF-17 | Observability | `src/db/mongo.js:7`, `src/hooks.server.js:5`, `src/hooks.server.js:8` | Logging is console-only and unstructured. | Harder to diagnose production failures or correlate requests. | Add structured server logs and avoid noisy startup logs in normal operation. | Low | Small | P2 | Deployment logging target. |
| CF-18 | Maintainability | `src/routes/+page.server.js:5-15`, `src/routes/api/all/+server.js:11-21` | Mongo query/sort/projection logic is duplicated. | Behavior can drift between page and API. | Extract a small data-access function for listing series. | Low | Small | P2 | None. |
| CF-19 | Maintainability | `src/db/mongo.js:4-11`, `src/db/series.js:1-3`, `src/hooks.server.js:3-9` | DB client and collection are module-level singletons with startup side effects. | Unit tests and controlled connection lifecycle are harder. | Wrap DB access in explicit functions that can be mocked or injected. | Medium | Medium | P2 | Test strategy. |
| CF-20 | Dependency Health | `package.json:32-49`, `package-lock.json:17-27` | Core stack is old: SvelteKit 1.x, Svelte 3.x, Vite 4.x, Prettier 2.x, MongoDB driver 5.x. | Increased maintenance burden and potential unresolved vulnerabilities. | Plan incremental dependency upgrades with checks/tests after each step. | Medium | Large | P2 | Add tests/checks first; verify SvelteKit migration path. |
| CF-21 | Dependency Health | `.gitignore:9`, `.prettierignore:10-13`, `bun.lockb`, `package-lock.json:1-29` | Package-manager policy is unclear: `bun.lockb` is tracked, `package-lock.json` exists but is ignored, README recommends npm. | Non-reproducible installs and inconsistent dependency trees. | Standardize on Bun, keep `bun.lockb`, and update docs/CI/deployment commands. | Medium | Small | P1 | Confirm latest Bun version in implementation. |
| CF-22 | Build/Deployment | `package.json:23-30`, `svelte.config.js:1-7` | Adapter-node is configured but no production `start` script exists. | Deployment instructions are incomplete and platform startup may be unclear. | Document Dokploy Node/Bun build flow and start command. | Medium | Small | P1 | Confirm runtime port/env settings. |
| CF-23 | CI/CD | `.github/workflows/release.yml:3-29` | Only tag-based release workflow exists; no push/PR CI for install, lint, check, tests, or build. | Regressions can merge without automated validation. | Add CI for Bun install, formatting, `svelte-check`, Vitest, and build. | Medium | Medium | P1 | Bun standardization. |
| CF-24 | CI/CD | `.github/workflows/release.yml:13-22` | Workflow uses older action majors: `actions/checkout@v2`, `softprops/action-gh-release@v1`. | Older actions may miss fixes and current platform behavior. | Upgrade actions in a dedicated CI maintenance change. | Low | Small | P3 | None. |
| CF-25 | CI/CD | `.github/workflows/release.yml:16-18` | Release zips the full workspace without building or excluding unnecessary files. | Releases may include source clutter and omit deploy-ready artifacts. | Build first, publish intended artifacts only, and document release contents. | Low | Small | P3 | Release strategy. |
| CF-26 | Tests | `package.json:23-30`; no files found for `**/*.{test,spec}.{js,ts,svelte}` or test config. | No automated tests or test script are present. | Refactoring auth, pagination, or dependency upgrades is risky. | Add Vitest tests for API validation, data listing, and core rendering/data behavior. | Medium | Medium | P1 | Add Vitest. |
| CF-27 | Testability | `src/db/mongo.js:4-11`, `src/hooks.server.js:3-9` | DB connection side effects make isolated tests harder. | Tests may require a real Mongo connection or brittle module mocks. | Refactor DB access behind functions and mockable boundaries. | Medium | Medium | P2 | Test strategy. |
| CF-28 | Dead Code | `src/routes/api/seed/+server.js:9-24` | Seed endpoint is effectively obsolete and returns “Nothing here” with commented-out insert code. | Public dead endpoint increases maintenance and attack surface. | Remove it or make it inaccessible outside intentional admin maintenance. | Medium | Small | P1 | Decide whether seeding is still needed. |
| CF-29 | Obsolete/Unused Pattern | `src/routes/+page.svelte:23` | `data-sveltekit-noscroll` is placed on a `<li>` without navigation behavior. | It likely has no effect and confuses future maintainers. | Remove it unless a specific SvelteKit navigation behavior is needed. | Low | Small | P3 | None. |
| CF-30 | Documentation | `README.md:44-58`, `src/db/mongo.js:2-4` | README documents dev/build commands but not required `MONGO_URL` setup. | New contributors cannot run the app without guessing env configuration. | Add environment setup and example MongoDB connection guidance. | Medium | Small | P1 | Safe example values; do not expose secrets. |
| CF-31 | Documentation | `README.md`, `src/routes/api/all/+server.js`, `src/routes/api/add/+server.js`, `src/routes/api/seed/+server.js` | API routes are not documented. | Users/maintainers may misuse unsafe endpoints. | Document supported APIs after securing or removing write/seed endpoints. | Low | Small | P2 | API decisions. |
| CF-32 | Documentation | `DESIGN.md` is empty. | Design intent, visual rules, and UX decisions are undocumented. | Future UI changes may become inconsistent. | Fill with current design principles, layout behavior, and theme decisions. | Low | Small | P3 | Product/design preferences. |
| CF-33 | Documentation | `README.md:83-86`, `LICENCE:1` | README links to `LICENSE`, but repo file is named `LICENCE`. | License link may be broken on platforms expecting `LICENSE`. | Rename file or update README link consistently. | Low | Small | P3 | None. |

## Assumptions And Items To Verify

| ID | Area | Evidence | Assumption | Impact If Wrong | Recommended Verification | Risk | Effort | Priority | Dependencies |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A-01 | Product | `package.json:3`, `README.md:8` | The app is intended as a personal public catalog with admin-only writes. | Auth, admin UX, and moderation priorities may change. | Confirm whether any public write capability is needed. | Medium | Small | P0 | Product owner input. |
| A-02 | Environment | `src/db/mongo.js:2-4`; `.env.example` could not be inspected due local read policy. | `MONGO_URL` and `ADMIN_API_TOKEN` are the required runtime secrets. | Missing env docs may be broader than identified. | Inspect env example with permission and document all required variables. | Medium | Small | P1 | Permission to inspect `.env.example`. |
| A-03 | Dependency Security | `package.json:32-49` | Dependency risk is based on age/config only; no vulnerability audit was run. | Actual vulnerability severity may be higher or lower. | Run Bun/npm audit-compatible checks after package-manager policy is implemented. | Medium | Small | P1 | Bun standardization. |
| A-04 | Build Health | `package.json:25-29` | Build/check status is unknown because commands were not run in read-only audit mode. | There may be additional compile/type issues. | Run `bun run check`, `bun run lint`, and `bun run build` after Bun standardization. | Medium | Small | P1 | Bun standardization. |
| A-05 | Data Shape | `src/routes/+page.svelte:21-27`, `src/routes/+page.server.js:9-10` | Existing Mongo records may contain a custom `id` field despite `_id` being excluded. | The `id` mismatch may affect only newly added records. | Inspect sanitized sample data or add schema validation. | Low | Small | P2 | Safe database access. |

## Product Feature Opportunities

| ID | Area | Evidence | Opportunity | User Impact | Recommended Improvement | Risk | Effort | Priority | Dependencies |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| PF-01 | Discovery | `src/routes/+page.svelte:17-39` | Add search and filtering by name/status/genre. | Users can find shows faster as the catalog grows. | Add query-backed search with indexed Mongo fields. | Low | Medium | P2 | Data model for metadata. |
| PF-02 | Catalog Detail | `src/lib/components/Card.svelte:2-9` | Cards only show name and poster. | The catalog is visually useful but shallow. | Add optional details like rating, watched date, platform, notes, and status. | Low | Medium | P2 | Schema decision and migration plan. |
| PF-03 | Admin UX | `src/routes/api/add/+server.js:8-37` | Adding entries currently requires an unsafe API URL. | Safer and easier content management. | Build authenticated admin form for create/edit/delete after the token-protected API exists. | Medium | Large | P2 | Admin API and auth token. |
| PF-04 | Sharing/SEO | `src/routes/+page.svelte:13-15`, `src/app.html:4-7` | Page metadata is minimal. | Shared links are less informative. | Add description, Open Graph tags, and richer page metadata. | Low | Small | P3 | Copy and preview image. |
| PF-05 | Preferences | `src/routes/+layout.svelte:4`, `src/routes/+layout.svelte:18-20` | Theme exists but is not persisted. | Better returning-user experience. | Persist theme and optionally respect system color scheme. | Low | Small | P3 | UX preference. |

## Recommended Incremental Plan

| Step | Goal | Priority |
| --- | --- | --- |
| 1 | Secure or remove public write/seed endpoints. | P0 |
| 2 | Fix API validation and real HTTP status codes. | P1 |
| 3 | Standardize on Bun as the package manager: keep `bun.lockb`, remove npm lockfile ambiguity, update docs, CI, and deployment commands. | P1 |
| 4 | Add CI with Bun install, lint, Svelte check, Vitest, and build. | P1 |
| 5 | Add minimal Vitest coverage around API validation and list rendering/data behavior. | P1 |
| 6 | Add server-side pagination before catalog size grows. | P1 |
| 7 | Fix accessibility gaps in layout, theme toggle, headings, and image alt text. | P1/P2 |
| 8 | Add Dokploy deployment documentation using Dokploy's Node/Bun build flow. Document Bun install/build/start commands and required environment variables in Dokploy. | P1 |
| 9 | Improve documentation for env setup, APIs, deployment, and design. | P2/P3 |
| 10 | Plan dependency upgrades after tests and CI are in place. | P2 |

No complete rewrite is recommended. The app is small enough for incremental hardening and cleanup.
