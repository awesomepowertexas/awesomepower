# Node

Create `.env`

```
echo "DATABASE_URL=mysql://root@localhost:3306/awesomepower
GOOGLE_APPLICATION_CREDENTIALS=google-credentials.json
NODE_ENV=development" >> .env
```

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

# Database

Start database server

```
mysqld_safe &
```

Migrate database

```
npx prisma db push
```

Seed database

```
npx prisma db seed
```

# Run server

```
pnpm dev
```
