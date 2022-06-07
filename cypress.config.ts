import { defineConfig } from 'cypress'

export default defineConfig({
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      return config
    },
    specPattern: 'src/**/__tests__/*.spec.tsx',
    video: false,
    viewportHeight: 600,
    viewportWidth: 800,
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      return config
    },
    specPattern: 'cypress/e2e/**/*.spec.ts',
    viewportHeight: 1024,
    viewportWidth: 1440,
  },
  env: {
    codeCoverage: {
      url: '/api/__coverage__',
    },
  },
  projectId: '68w8zv',
})
