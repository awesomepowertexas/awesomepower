import registerIntercepts from './.intercepts'

describe('Plans', () => {
  beforeEach(() => {
    registerIntercepts()

    cy.seed()

    cy.visit('/plans/75234')
  })

  it('loads plans', () => {
    cy.get('#select-term').select('All')
    cy.get('[data-cypress=plan-card]').should('have.length', 54)
  })
})
