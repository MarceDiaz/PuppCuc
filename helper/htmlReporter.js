var reporter = require('cucumber-html-reporter')
const data = require('../features/support/data')

const outputFolder = data.params.output

var options = {
  theme: 'bootstrap',
  jsonFile: outputFolder + 'report.json',
  output: outputFolder + 'report.html',
  reportSuiteAsScenarios: true,
  metadata: {

  }
}

reporter.generate(options)
