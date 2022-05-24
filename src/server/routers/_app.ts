import superjson from '~/src/utils/superjson'
import { createRouter } from '../createRouter'
import listPlansRouter from './plan/listPlansRouter'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge(listPlansRouter)

export type AppRouter = typeof appRouter
