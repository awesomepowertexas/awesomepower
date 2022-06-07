describe('Plans', () => {
  it('loads plans', () => {
    cy.visit('/plans/75234')

    cy.get('#select-term').select('All')
    cy.get('[data-cypress=plan-card]').should('have.length', 54)
  })
})

export {}
