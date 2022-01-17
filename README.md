Create `.env`

```
echo "DATABASE_URL=postgresql://postgres:@localhost:5432/awesomepower
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

Create database

```
createuser postgres -s
createdb awesomepower
```

Seed database

```
pnpm db:reset
```

Run local server

```
pnpm dev
```
