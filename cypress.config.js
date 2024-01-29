const { defineConfig } = require("cypress")
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://blazedemo.com',
    "defaultCommandTimeout": 10000,
    "specPattern": "**/*.feature",
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber())
    },
  },
});
