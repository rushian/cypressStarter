const { defineConfig } = require("cypress")
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://blazedemo.com',

    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber())
    },
  },
});
