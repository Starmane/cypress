const { defineConfig } = require("cypress");

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
  },
  env: {
    authorUrl: 'https://a29b-93-136-186-63.ngrok-free.app/',
    publishUrl: 'https://9908-93-136-186-63.ngrok-free.app/',
    authorUsername: 'admin',
    authorPassword: 'admin'
  },
  screenshotsFolder: 'cypress/screenshots',
  retries: 0
});
