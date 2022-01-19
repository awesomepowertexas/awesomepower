import '@cypress/code-coverage/support'
import registerIntercepts from 'cypress/integration/.intercepts'

beforeEach(() => {
  registerIntercepts()
  cy.exec('NODE_ENV=development pnpm db:reset')
})

after(() => {
  cy.exec('pnpm job -- removeFullCoverage')
})
