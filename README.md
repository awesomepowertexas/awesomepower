[![Awesome Power](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/68w8zv/main&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/68w8zv/runs)
[![Coveralls](https://coveralls.io/repos/github/awesomepowertexas/awesomepower/badge.svg?branch=coveralls)](https://coveralls.io/github/awesomepowertexas/awesomepower?branch=coveralls)

# Stack

| Component  | Tool                                                        |
| ---------- | ----------------------------------------------------------- |
| Language   | [TypeScript](https://www.typescriptlang.org/)               |
| UI Library | [React](https://github.com/facebook/react)                  |
| Framework  | [Next.js](https://github.com/vercel/next.js)                |
| Styling    | [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) |
| ORM        | [Prisma](https://github.com/prisma/prisma)                  |
| API        | [tRPC](https://github.com/trpc/trpc)                        |
| Database   | [PlanetScale](https://planetscale.com/)                     |
| Hosting    | [Vercel](https://vercel.com/)                               |

## Other Notable Libraries

| Component         | Tool                                                   |
| ----------------- | ------------------------------------------------------ |
| Schema Validation | [Zod](https://github.com/colinhacks/zod)               |
| State Management  | [Zustand](https://github.com/pmndrs/zustand)           |
| Auth              | [NextAuth.js](https://github.com/nextauthjs/next-auth) |

# Setup

Create `.env`

```
echo "APP_ENV=development
DATABASE_URL=mysql://root@localhost:3306/awesomepower
GOOGLE_APPLICATION_CREDENTIALS=google-credentials.json" >> .env
```

## Node

Install pnpm

```
corepack enable
corepack prepare pnpm@7.0.0 --activate
```

Install dependencies

```
pnpm install
```

## Database

Start database server

```
mysqld_safe
```

Migrate database

```
pnpm prisma db push
```

Seed database

```
pnpm db:reset
```

# Run server

```
pnpm dev
```
