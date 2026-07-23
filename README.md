<h1 align="center">
MyAllTimeSeries
</h1>

<br>

<p align="center">
  <b>A web application that lists my all watched tv shows built with
  </b>
  <br>
</p>

<p align="center">
<a href="https://kit.svelte.dev">
<img width="100px" src="https://res.cloudinary.com/ydevcloud/image/upload/v1663804918/yassi/mxrjfvymnux04jhjwlh2.svg" align="center" alt="svelte" />
</a>
&nbsp; &nbsp; &nbsp;
<a href="https://tailwindcss.com">
<img width="300px" src="https://res.cloudinary.com/ydevcloud/image/upload/v1660842725/yassi/dglubft3rg2iuh6fxsaf.svg" align="center" alt="tailwind" />
&nbsp; &nbsp; &nbsp;
<a href="https://tailwindcss.com">
<img width="300px" src="https://res.cloudinary.com/ydevcloud/image/upload/v1676330152/YsnIrix/rrt22woawbnjijd9waqi.svg" align="center" alt="mongodb" />
</a>
</a>
</a>

</p>

<br>

<p align="center">
  <img src="https://res.cloudinary.com/ydevcloud/image/upload/v1676330207/YsnIrix/i7mjytx7g17igtuz8goi.png" alt="yt" width="600px" style="border-radius: 5px;">

</p>

<br>

![📟](https://res.cloudinary.com/ydevcloud/image/upload/v1656874185/asm9cp84cbuuqmarw9wq.png)

## ❯ Usage

**_I start learning the most beloved framework [Sveltekit](https://kit.svelte.dev) and that's what i'm using in the frontend_**

### Prerequisites

Use [Bun 1.3.14](https://bun.sh/). This project treats `bun.lockb` as the authoritative lockfile.

```sh
bun install --frozen-lockfile
```

### Environment

Create a local `.env` from `.env.example` and use safe local values only:

```sh
MONGO_URL=mongodb://127.0.0.1:27017/myalltimeseries
ADMIN_API_TOKEN=replace-with-a-strong-secret
NODE_ENV=development
PORT=3000
```

Runtime variables:

| Name              | Purpose                                                                 |
| ----------------- | ----------------------------------------------------------------------- |
| `MONGO_URL`       | Server-only MongoDB connection string, including the database name.     |
| `ADMIN_API_TOKEN` | Server-only bearer token for admin writes.                              |
| `NODE_ENV`        | Runtime mode, usually `development` or `production`.                    |
| `HOST`            | Host interface used by the production server. Use `0.0.0.0` in Dokploy. |
| `PORT`            | Port used by the adapter-node production server.                        |
| `ORIGIN`          | Public deployment origin for SvelteKit.                                 |

### Development

Once you've cloned the project, install dependencies and start a development server:

```sh
bun install --frozen-lockfile
bun run dev
# or start and open the app in a new browser tab
bun run dev -- --open
```

Quality checks:

```sh
bun run lint
bun run check
bun run test
bun run build
```

### Production

```sh
bun run build
```

> You can preview the built client app with `bun run preview`. This should _not_ be used to serve your app in production.

### Dokploy Dockerfile Deployment

Use Dokploy's Dockerfile deployment flow. No custom start command is needed because the image defines its own startup behavior.

Dokploy application settings:

| Setting              | Value           |
| -------------------- | --------------- |
| Deployment type      | Dockerfile      |
| Dockerfile path      | `./Dockerfile`  |
| Build context        | Repository root |
| Container port       | `3000`          |
| Health check path    | `/healthz`      |
| Expected health body | `{ ok: true }`  |

Set runtime environment variables in the Dokploy UI only. Do not commit deployment secrets or real connection strings.

```sh
MONGO_URL=<dokploy-managed-mongo-connection-string-with-db-name>
ADMIN_API_TOKEN=<strong-secret>
NODE_ENV=production
HOST=0.0.0.0
PORT=3000
ORIGIN=https://series.ysnirix.xyz
```

For Dokploy-managed MongoDB, use the connection string that is reachable from the app container and include the database name in `MONGO_URL`, for example the equivalent of `/myalltimeseries` at the end of the URI. Do not use `127.0.0.1` for a separate Mongo service from inside the app container.

Keep `.env.example` available in the Docker build context as a safe template only; production values belong in Dokploy environment settings.

### API

`GET /api/all?limit=10&cursor=<id>` lists series newest-first.

- `limit` defaults to `10` and is capped at `50`.
- `cursor` is the previous response `next_cursor` value.
- Success response: `{ error, data, next_cursor, has_more }`.
- Invalid pagination parameters return `400`.
- Server/database failures return `500` with a generic message.

`POST /api/add` creates a series and requires `Authorization: Bearer <ADMIN_API_TOKEN>`.

```json
{
	"name": "Series Name",
	"poster": "https://example.com/poster.jpg"
}
```

- `name` and `poster` are required strings.
- `poster` must be an `http` or `https` URL.
- Success returns `201` with `{ error: false, id }`.
- Invalid JSON/body data returns `400`.
- Missing or invalid bearer token returns `401`.
- Server/database failures return `500` with a generic message.

<br>

![🙌](https://raw.githubusercontent.com/ahmadawais/stuff/master/images/git/connect.png)

## ❯ About

<summary><strong>Contributing</strong></summary>

Pull requests and stars are always welcome. For bugs and features requests, [please create an issue](../../issues/new).

#### Author

**Ysn4Irix**

- [GitHub Profile](https://github.com/Ysn4irix)
- [Instagram Profile](https://instagram.com/ysn.irix)

<br>

![📃](https://raw.githubusercontent.com/ahmadawais/stuff/master/images/git/license.png)

## ❯ License

Copyright © 2022-present, [Ysn4Irix](https://github.com/Ysn4Irix).
Released under the [MIT License](LICENSE).
