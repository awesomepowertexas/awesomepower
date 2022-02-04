import registerIntercepts from 'cypress/integration/.intercepts'
import './index'

beforeEach(() => {
  registerIntercepts()
  cy.exec('pnpm db:reset')
})

after(() => {
  if (process.env.NODE_ENV === 'development') {
    cy.exec('pnpm coverage:process')
  }
})
