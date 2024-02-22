const { defineConfig } = require("cypress");

module.exports = defineConfig({
  'cypress-cucumber-preprocessor': {
   nonGlobalStepDefinitions: true,
   step_definitions: 'cypress/integration/',    
  },
  e2e: {
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    //specPattern: 'cypress/e2e/*.js',
    specPattern: 'cypress/integration/*.feature',
    screenshotsFolder: 'cypress/screenshots',
    video: true,
    videosFolder: 'cypress/videos',
    defaultCommandTimeout: 5000,
    baseUrl: 'https://blazedemo.com'
  },
});