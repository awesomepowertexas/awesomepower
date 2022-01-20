# Stack

| Component         | Tool                                                        |
| ----------------- | ----------------------------------------------------------- |
| Language          | [TypeScript](https://www.typescriptlang.org/)               |
| Framework         | [Next.js](https://github.com/vercel/next.js)                |
| API               | [tRPC](https://github.com/trpc/trpc)                        |
| Schema Validation | [Zod](https://github.com/colinhacks/zod)                    |
| State Management  | [Zustand](https://github.com/pmndrs/zustand)                |
| Auth              | [NextAuth.js](https://github.com/nextauthjs/next-auth)      |
| Styling           | [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) |
| ORM               | [Prisma](https://github.com/prisma/prisma)                  |
| Database          | [PlanetScale](https://planetscale.com/)                     |
| Hosting           | [Vercel](https://vercel.com/)                               |

# Setup

Create `.env`

```
echo "DATABASE_URL=mysql://root@localhost:3306/awesomepower
GOOGLE_APPLICATION_CREDENTIALS=google-credentials.json
NODE_ENV=development" >> .env
```

## Node

Install pnpm

```
corepack enable
corepack prepare pnpm@6.26.1 --activate
```

Install dependencies

```
pnpm install
```

Install git hooks

```
pnpm prepare
```

## Database

Start database server

```
mysqld_safe
```

Migrate database

```
pnpm exec prisma db push
```

Seed database

```
pnpm db:reset
```

# Run server

```
pnpm dev
```
