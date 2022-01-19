import registerIntercepts from 'cypress/integration/.intercepts'
import './index'

beforeEach(() => {
  registerIntercepts()
  cy.exec('NODE_ENV=development pnpm db:reset')
})
