import '@cypress/code-coverage/support'

after(() => {
  if (process.env.NODE_ENV === 'development') {
    cy.exec('pnpm job -- coverage/removeFullCoverage')
  }
})
