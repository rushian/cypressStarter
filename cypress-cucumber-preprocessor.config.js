module.exports = {
  stepDefinitions: [
    'cypress/support/scripts/**/*.steps.{js,ts}',
    'cypress/support/scripts/**/steps/*.steps.{js,ts}',
    'cypress/support/scripts/**/**/steps/*.steps.{js,ts}'
  ],
  messages: {
    enabled: true,
    output: '.tmp/' + process.env.CYPRESS_E2E_REPORT_FOLDER + '/cucumber.ndjson'
  },
  cucumberJson: {
    generate: true,
    outputFolder: '.tmp/' + process.env.CYPRESS_E2E_REPORT_FOLDER,
    outputFile: 'cucumber.json'
  }
};
