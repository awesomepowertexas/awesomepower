Cypress.Commands.add('seed', () => {
  cy.exec('pnpm job -- seed')
})

export {}
