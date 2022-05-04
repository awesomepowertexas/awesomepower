/**
 * Generate Tailwind code for component tests.
 */
before(() => {
  cy.exec(
    'pnpm tailwindcss --minify --config tailwind.config.js --input ./src/styles/globals.css',
  ).then(({ stdout }) => {
    if (!document.head.querySelector('#tailwind-style')) {
      const link = document.createElement('style')
      link.id = 'tailwind-style'
      link.innerHTML = stdout

      document.head.appendChild(link)
    }
  })
})

export {}
