const { parserPlugins } = require('@istanbuljs/schema').defaults.nyc

module.exports = {
  cache: false,
  include: ['src/**'],
  parserPlugins: parserPlugins.concat('typescript', 'jsx'),
  'report-dir': './.nyc/coverage',
  reporter: ['html', 'json'],
  'skip-empty': true,
  'skip-full': true,
  summarizer: 'flat',
  'temp-dir': './.nyc/output',
}
