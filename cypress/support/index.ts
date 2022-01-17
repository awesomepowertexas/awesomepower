import '@cypress/code-coverage/support'
import './commands'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace, no-unused-vars
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to seed the database.
       * @example cy.seed()
       */
      seed(): Chainable<Element>
    }
  }
}

after(() => {
  cy.exec('pnpm job -- removeFullCoverage')
})
