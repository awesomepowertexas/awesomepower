import superjson from '~/utils/superjson'
import { createRouter } from '../createRouter'
import { planRouter } from './plan'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('plan.', planRouter)

export type AppRouter = typeof appRouter
