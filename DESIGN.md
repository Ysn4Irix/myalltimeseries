# Design Notes

## Product Purpose And Audience

MyAllTimeSeries is a personal/public catalog of watched TV shows. The primary audience is anyone browsing the collection; the maintainer audience uses the admin API to add entries. The product is intentionally simple: discovery happens through a fast poster grid rather than search, filters, ratings, or editorial metadata.

## Visual Direction

The visual system is poster-first. Cards give most of the available space to artwork because poster recognition is the fastest way to scan a known show catalog. Supporting chrome stays minimal so the catalog feels like a wall of collected covers instead of an admin table.

The app keeps the existing Tailwind/DaisyUI foundation and uses the light/night theme pairing to support both neutral daytime browsing and a darker media-library feel. Theme styling should remain subordinate to the posters: backgrounds and controls can frame the collection, but they should not compete with cover art.

## Layout And Interaction

The home page uses a responsive card grid so the same content model works on mobile, tablet, and desktop. Cards should wrap naturally, keep consistent spacing, and avoid layout jumps while images load.

Poster media uses a stable 2:3 frame with `object-contain`. This preserves full poster artwork without cropping names, faces, or title treatments, even when source images have slight aspect-ratio differences. The frame background absorbs letterboxing when needed.

Infinite scroll is used because the catalog is visual and sequential. The initial page is intentionally bounded to keep server work and first payload size small, then older items load as the reader reaches the end. Pagination remains cursor-based so the UI can grow without fetching the entire collection.

Motion is restrained. Card hover and list transitions add light polish for users who allow motion, while reduced-motion preferences disable or avoid non-essential movement. Motion should never be required to understand state or navigate content.

## Accessibility Decisions

The GitHub link has an accessible label, the theme toggle exposes switch semantics, and poster images use meaningful alt text based on the series name. Lazy images keep a stable aspect ratio to reduce layout shift.

A visible home page heading is intentionally deferred by product decision in `T25`. Future changes should revisit page-context accessibility if the product direction allows a visible heading or another prominent label without compromising the desired poster-wall presentation.

## Data And API Architecture

SvelteKit server load functions and API routes use server-only helpers for MongoDB access. Mongo connection details are read at runtime from private environment variables rather than embedded in client code or build-time configuration.

Series records are serialized with a stable string `id` derived from Mongo `_id`, plus `name` and `poster`. Listing and creation behavior is centralized in `src/lib/server/series.js` so the page and APIs share validation, pagination, and serialization decisions.

## API Contracts

`GET /api/all` returns newest-first paginated series data. It accepts `limit` with a default of `10` and max of `50`, plus an optional ObjectId cursor. Successful responses use `{ error, data, next_cursor, has_more }`. Invalid pagination returns `400`; unexpected server or database failures return `500` with a generic client-facing message.

`POST /api/add` is the admin create endpoint. It requires `Authorization: Bearer <ADMIN_API_TOKEN>` and a JSON body with `{ name, poster }`. The poster must be an `http` or `https` URL. Successful creation returns `201`; invalid auth returns `401`; invalid JSON or fields return `400`; unexpected failures return `500`.

## Testing And CI

Vitest covers server helper and API behavior for auth, validation, creation, pagination, and serialization without connecting to a real MongoDB instance or requiring real secrets. CI uses Bun to run frozen install, lint, Svelte check, tests, and production build on push and pull request workflows.

## Known Tradeoffs

The app does not persist theme preference yet, so the toggle can reset across refresh/navigation lifecycle boundaries. The exact series count still uses a database count query. Poster URLs are validated as HTTP(S), but trusted host allowlisting is deferred until there is a concrete abuse, privacy, or content-quality requirement. Current-major T42 dependency upgrades are complete; only major migrations are intentionally deferred until they can be planned and validated incrementally.
