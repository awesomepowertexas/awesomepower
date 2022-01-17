export default function registerIntercepts() {
  cy.intercept('GET', '/api/trpc/plan.all*').as('plan.all')
}
