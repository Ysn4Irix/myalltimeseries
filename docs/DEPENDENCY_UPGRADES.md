# Dependency Upgrade Checklist

## Scope

This checklist records the T42 current-major dependency upgrade pass and keeps the remaining major migrations separated for future work.

Bun remains pinned at `1.3.14`. Keep `packageManager: "bun@1.3.14"`, `bun.lockb`, Bun CI, and Dokploy Bun commands authoritative unless a separate task explicitly changes the package-manager policy.

## Current Dependency Snapshot

Snapshot source: `package.json` after T42.

Package manager:

| Package | Current |
| ------- | ------- |
| bun     | 1.3.14  |

Runtime dependencies:

| Package                | Current |
| ---------------------- | ------- |
| @sveltejs/adapter-node | ^1.3.1  |
| daisyui                | ^2.52.0 |
| mongodb                | ^5.9.2  |

Development dependencies:

| Package                | Current |
| ---------------------- | ------- |
| @sveltejs/kit          | 1.26.0  |
| autoprefixer           | ^10.5.4 |
| postcss                | ^8.5.20 |
| prettier               | ^2.8.8  |
| prettier-plugin-svelte | 2.8.1   |
| svelte                 | ^3.59.2 |
| svelte-check           | ^3.8.6  |
| svelte-preprocess      | ^5.1.4  |
| tailwindcss            | ^3.4.19 |
| typescript             | ^4.9.5  |
| vite                   | ^4.5.14 |
| vitest                 | ^0.34.6 |

## T42 Completion Record

T42 current-major upgrades were applied with Bun, keeping Bun pinned at `1.3.14` and keeping `bun.lockb` authoritative. No npm, yarn, or pnpm lockfile was added.

Completed current-major updates:

| Package                | Before   | After   | Notes                                 |
| ---------------------- | -------- | ------- | ------------------------------------- |
| @sveltejs/adapter-node | ^1.1.8   | ^1.3.1  | Latest adapter-node 1.x               |
| daisyui                | ^2.50.0  | ^2.52.0 | Latest daisyUI 2.x                    |
| mongodb                | ^5.0.1   | ^5.9.2  | Latest MongoDB driver 5.x             |
| @sveltejs/kit          | ^1.5.0   | 1.26.0  | Held below later 1.x validation break |
| autoprefixer           | ^10.4.13 | ^10.5.4 | Latest autoprefixer 10.x              |
| postcss                | ^8.4.21  | ^8.5.20 | Latest PostCSS 8.x                    |
| prettier               | ^2.8.0   | ^2.8.8  | Latest Prettier 2.x                   |
| prettier-plugin-svelte | ^2.8.1   | 2.8.1   | Held below later 2.x lint change      |
| svelte                 | ^3.54.0  | ^3.59.2 | Latest Svelte 3.x                     |
| svelte-check           | ^3.0.1   | ^3.8.6  | Latest svelte-check 3.x               |
| svelte-preprocess      | ^5.0.1   | ^5.1.4  | Latest svelte-preprocess 5.x          |
| tailwindcss            | ^3.2.6   | ^3.4.19 | Latest Tailwind CSS 3.x               |
| typescript             | ^4.9.3   | ^4.9.5  | Latest TypeScript 4.x                 |
| vite                   | ^4.0.0   | ^4.5.14 | Latest Vite 4.x                       |
| vitest                 | ^0.34.6  | ^0.34.6 | Already latest Vitest 0.x             |

Validation-driven holds:

| Package                | Tested latest same-major | Held at | Reason                                                                                           |
| ---------------------- | ------------------------ | ------- | ------------------------------------------------------------------------------------------------ |
| @sveltejs/kit          | 1.30.4                   | 1.26.0  | `1.27.7` and later fail `svelte-check` in `vite.config.js` with `vitest/config` Vite type split. |
| prettier-plugin-svelte | 2.10.1                   | 2.8.1   | `2.10.1` changes Svelte formatting expectations for `src/routes/+layout.svelte`.                 |

Validation results:

```sh
bun install --frozen-lockfile
bun run lint
bun run check
bun run test
bun run build
```

All commands passed after the two holds above.

Mongo note: no local or staging Mongo smoke/API writes were run during T42. The automated tests mock Mongo access, and production/staging write smoke checks remain opt-in only with safe staging data.

## Baseline Before Upgrades

Before starting T42, confirm the current branch passes without dependency changes:

```sh
bun install --frozen-lockfile
bun run lint
bun run check
bun run test
bun run build
```

If baseline verification fails, stop and fix baseline issues before editing dependency versions.

## T42 Group 1: Current-Major Updates

Goal: update to the latest compatible patch/minor releases within the currently adopted major versions. Do not combine this group with major framework, formatter, CSS, or MongoDB-driver migrations.

Allowed target constraints:

| Package                | T42 Group 1 target rule                            |
| ---------------------- | -------------------------------------------------- |
| svelte                 | Latest compatible Svelte 3 release                 |
| @sveltejs/kit          | Latest compatible SvelteKit 1 release              |
| @sveltejs/adapter-node | Latest compatible adapter-node 1 release           |
| vite                   | Latest compatible Vite 4 release                   |
| tailwindcss            | Latest compatible Tailwind CSS 3 release           |
| daisyui                | Latest compatible daisyUI 2 release                |
| mongodb                | Latest compatible MongoDB Node.js driver 5 release |
| prettier               | Latest compatible Prettier 2 release               |
| prettier-plugin-svelte | Latest compatible prettier-plugin-svelte 2 release |
| postcss                | Compatible patch/minor update only; avoid majors   |
| autoprefixer           | Compatible patch/minor update only; avoid majors   |
| svelte-check           | Compatible patch/minor update only; avoid majors   |
| typescript             | Compatible patch/minor update only; avoid majors   |
| vitest                 | Compatible patch/minor update only; avoid majors   |
| svelte-preprocess      | Compatible patch/minor update only; avoid majors   |

Execution notes:

1. Update a small set at a time if lockfile resolution or checks fail.
2. Keep all packages inside their current major versions unless the table above explicitly permits otherwise.
3. Avoid changing app code unless a patch/minor update exposes a real compatibility issue that must be fixed for T42.
4. Capture dependency warnings separately from failing verification commands.

Validation after Group 1:

```sh
bun install --frozen-lockfile
bun run lint
bun run check
bun run test
bun run build
```

## Stop And Rollback Criteria

Stop the upgrade group and revert only that group's dependency/lockfile changes if any of these occur:

| Stop condition                                         | Required response                                                          |
| ------------------------------------------------------ | -------------------------------------------------------------------------- |
| Frozen install cannot resolve reproducibly             | Revert group changes or split into smaller dependency sets.                |
| `bun run lint` changes formatting expectations broadly | Stop and defer formatter migration unless it is Prettier 2-only and small. |
| `bun run check` reports framework/type regressions     | Split SvelteKit/Svelte/Vite/type tooling updates smaller.                  |
| `bun run test` fails after previously passing          | Identify whether the failure is dependency-caused before proceeding.       |
| `bun run build` fails                                  | Stop; do not deploy or merge until build passes.                           |
| Runtime Mongo read/write behavior changes unexpectedly | Revert Mongo driver update and investigate separately.                     |

Rollback guidance:

1. Revert only the dependency versions and lockfile entries introduced by the failed group.
2. Do not revert unrelated user or parallel-agent changes.
3. Re-run the baseline validation commands after rollback.
4. Document any package that needs a separate follow-up task.

## Mongo Driver Smoke Checks

Run these staging checks after any MongoDB driver update, including current-major MongoDB 5 updates:

| Area              | Smoke check                                                                 |
| ----------------- | --------------------------------------------------------------------------- |
| Runtime env       | Deployment uses `MONGO_URL` at runtime; no build-time secret is required.   |
| Home page listing | `/` loads the first page of series without server errors.                   |
| Pagination API    | `GET /api/all?limit=10` returns bounded JSON with pagination fields.        |
| Cursor pagination | A returned `next_cursor`, when present, can fetch the next page.            |
| Admin create API  | Authenticated `POST /api/add` creates one valid staging record.             |
| Auth failure      | Missing or invalid bearer token still returns `401`.                        |
| Invalid input     | Invalid `name` or `poster` still returns `400`.                             |
| Server logs       | No Mongo connection pool, topology, cursor, or serialization errors appear. |

Use staging data and staging secrets only. Do not inspect, print, or commit real production secrets.

## Deferred Major Groups

These are intentionally outside T42 Group 1 and should each receive their own migration task, review, and validation.

### Prettier 3 Tooling Migration

Scope:

| Package area | Deferred target                                                    |
| ------------ | ------------------------------------------------------------------ |
| prettier     | Prettier 3                                                         |
| plugins      | Prettier 3-compatible Svelte plugin and any related config changes |

Notes:

1. Expect formatting output changes.
2. Keep this separate from framework or CSS upgrades to make diffs reviewable.
3. Run the full validation command set after formatting/config changes.

### Svelte, SvelteKit, And Vite Major Migration

Scope:

| Package area | Deferred target                                                  |
| ------------ | ---------------------------------------------------------------- |
| SvelteKit    | SvelteKit 2                                                      |
| Svelte       | Svelte 5                                                         |
| Vite         | Next required Vite major for the selected SvelteKit/Svelte stack |

Notes:

1. Treat this as an application migration, not a routine dependency bump.
2. Review SvelteKit migration guides, Svelte 5 compatibility/runes requirements, adapter-node requirements, and Vite config changes before editing.
3. Keep Tailwind/daisyUI and Prettier major changes out of this group unless a migration guide requires otherwise.

### Tailwind 4 And daisyUI 5 Migration

Scope:

| Package area | Deferred target |
| ------------ | --------------- |
| tailwindcss  | Tailwind CSS 4  |
| daisyui      | daisyUI 5       |

Notes:

1. Expect configuration and theme-token changes.
2. Review generated styles on desktop and mobile.
3. Smoke-check theme toggle, card grid, poster framing, reduced-motion behavior, and pagination loading state.

### MongoDB Driver 6/7 Migration

Scope:

| Package area | Deferred target               |
| ------------ | ----------------------------- |
| mongodb      | MongoDB Node.js driver 6 or 7 |

Notes:

1. Review driver release notes for Node runtime support, connection behavior, ObjectId behavior, and removed/deprecated options.
2. Keep this separate from framework migrations.
3. Run the Mongo staging smoke checks before production deployment.

Validation after each deferred major group:

```sh
bun install --frozen-lockfile
bun run lint
bun run check
bun run test
bun run build
```
