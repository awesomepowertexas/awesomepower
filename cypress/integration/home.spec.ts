describe('Home', () => {
  it('navigates', () => {
    cy.visit('/')

    cy.get('h1').should('contain', 'Find a cheap')

    // FAQs
    cy.get('header').contains('FAQs').click()
    cy.get('footer').contains('FAQs').click()

    cy.get('#faqs svg[data-icon=circle-chevron-down]')
      .first()
      .click()
      .parent()
      .parent()
      .next()
      .should('contain', 'Awesome Power is free to use and always will be.')

    // Privacy
    cy.get('footer').contains('Privacy').click()
    cy.get('h1').should('contain', 'Privacy Policy')
    cy.location('pathname').should('eq', '/privacy')

    // Terms
    cy.get('footer').contains('Terms').click()
    cy.get('h1').should('contain', 'Terms and Conditions')
    cy.location('pathname').should('eq', '/terms')

    // Home
    cy.get('header a[data-cypress=logo]').click()
    cy.location('pathname').should('eq', '/')
  })

  it('finds plans', () => {
    cy.visit('/')

    // Invalid zip
    cy.get('input[data-cypress=find-plans]').type('{enter}abcd12345')

    cy.wait('@plan.all').should((interception) => {
      expect(interception.response?.statusCode).to.equal(200)
      expect(interception.response?.body[0]).to.have.all.keys('id', 'result')
      expect(interception.response?.body[0].result.data.json).to.have.length(0)
    })

    cy.get('input[data-cypress=find-plans]')
      .next()
      .should('contain', 'No plans found for this zip code')

    // Valid zip
    cy.get('input[data-cypress=find-plans]').clear().type('75234')

    cy.wait('@plan.all').should((interception) => {
      expect(interception.response?.statusCode).to.equal(200)
      expect(interception.response?.body[0]).to.have.all.keys('id', 'result')
      expect(interception.response?.body[0].result.data.json).to.have.length(54)
    })

    cy.get('input[data-cypress=find-plans]')
      .next()
      .find('button')
      .should('contain', 'View 54 plans')
      .click()

    cy.location('pathname').should('eq', '/plans/75234')
  })
})

export {}
