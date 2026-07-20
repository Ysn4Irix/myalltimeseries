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

| Name              | Purpose                                              |
| ----------------- | ---------------------------------------------------- |
| `MONGO_URL`       | Server-only MongoDB connection string.               |
| `ADMIN_API_TOKEN` | Server-only bearer token for admin writes.           |
| `NODE_ENV`        | Runtime mode, usually `development` or `production`. |
| `PORT`            | Port used by the adapter-node production server.     |

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

### Dokploy Node/Bun Deployment

Set the runtime variables above in Dokploy, then use these commands:

| Step    | Command                         |
| ------- | ------------------------------- |
| Install | `bun install --frozen-lockfile` |
| Build   | `bun run build`                 |
| Start   | `bun ./build/index.js`          |

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
