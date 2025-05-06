const { defineConfig } = require("cypress");
const cypressSplit = require('cypress-split')

module.exports = defineConfig({
  projectId: "qgzc5k",
  viewportWidth: 1920,
  viewportHeight: 1080,
  defaultCommandTimeout: 60000,
  responseTimeout: 60000,
  requestTimeout: 60000,
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    chromeWebSecurity:false,
    setupNodeEvents(on, config) {
      cypressSplit(on, config)
      // IMPORTANT: return the config object
      return config
    },
  },
  env: {
    authorUrl: 'https://uitesting.ngrok.app',
    publishUrl: 'https://uitestingpublish.ngrok.app',
    authorUsername: 'admin',
    authorPassword: 'admin'
  },
  screenshotsFolder: 'cypress/screenshots',
  retries: 1
});