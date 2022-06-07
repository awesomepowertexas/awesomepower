import { mount } from 'cypress/react'
import lodash from 'lodash'
import Button from '../Button'

describe('Button', () => {
  it('takes color as a prop', () => {
    const component = <Button color="green">Test button</Button>

    mount(component)

    cy.get('button')
      .should('contain', 'Test button')
      .should('have.css', 'background-color', 'rgb(34, 197, 94)')

    const cloned = lodash.cloneDeep(component)
    cloned.props.color = 'blue' // eslint-disable-line
    mount(cloned)

    cy.get('button')
      .should('contain', 'Test button')
      .should('have.css', 'background-color', 'rgb(59, 130, 246)')
  })

  it('handles loading state', () => {
    const component = (
      <Button color="green" loading={false}>
        Test button
      </Button>
    )

    mount(component)

    cy.get('button')
      .should('contain', 'Test button')
      .should('have.css', 'background-color', 'rgb(34, 197, 94)')

    const cloned = lodash.cloneDeep(component)
    cloned.props.loading = true // eslint-disable-line
    mount(cloned)

    cy.get('button')
      .should('have.css', 'background-color', 'rgb(34, 197, 94)')
      .find('svg')
      .should('have.attr', 'data-icon', 'loading-spinner')
  })
})
