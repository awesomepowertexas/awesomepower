// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import registerCodeCoverageTasks from '@cypress/code-coverage/task'
import injectDevServer from '@cypress/react/plugins/next'

const config: Cypress.PluginConfig = (on, config) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  registerCodeCoverageTasks(on, config)

  if (config.testingType === 'component') {
    injectDevServer(on, config)
  }

  return config
}

export default config
