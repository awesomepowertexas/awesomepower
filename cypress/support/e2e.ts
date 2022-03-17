import './index'
import registerIntercepts from './registerIntercepts'

beforeEach(() => {
  registerIntercepts()
  cy.exec('pnpm db:reset')
  cy.exec('pnpm db:seed')
})
