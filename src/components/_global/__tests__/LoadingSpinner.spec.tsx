import { mount } from '@cypress/react'
import LoadingSpinner from '../LoadingSpinner'

describe('LoadingSpinner', () => {
  it('takes size as a prop', () => {
    mount(<LoadingSpinner size={48} />)

    cy.get('svg[data-icon=loading-spinner]')
      .last()
      .should('be.visible')
      .should('have.attr', 'width', '48px')
  })

  it('has a default size of 20', () => {
    mount(<LoadingSpinner />)

    cy.get('svg[data-icon=loading-spinner]')
      .last()
      .should('be.visible')
      .should('have.attr', 'width', '20px')
  })
})
