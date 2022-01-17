/**
 * Generate Tailwind code for component tests.
 */
before(() => {
  if (Cypress.spec.name.endsWith('.spec.tsx')) {
    cy.exec('npx tailwindcss -i ./src/styles/globals.css -m').then(
      ({ stdout }) => {
        if (!document.head.querySelector('#tailwind-style')) {
          const link = document.createElement('style')
          link.id = 'tailwind-style'
          link.innerHTML = stdout

          document.head.appendChild(link)
        }
      },
    )
  }
})

export {}
