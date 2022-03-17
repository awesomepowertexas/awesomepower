import { createReactQueryHooks } from '@trpc/react'
import type { inferProcedureOutput } from '@trpc/server'
import type { AppRouter } from '~/src/server/routers/_app'

export const trpc = createReactQueryHooks<AppRouter>()

export type InferQueryOutput<
  TRouteKey extends keyof AppRouter['_def']['queries'],
> = inferProcedureOutput<AppRouter['_def']['queries'][TRouteKey]>
