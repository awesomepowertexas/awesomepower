import registerIntercepts from 'cypress/integration/.intercepts'
import './index'

beforeEach(() => {
  registerIntercepts()
  cy.exec('pnpm db:reset')
})
