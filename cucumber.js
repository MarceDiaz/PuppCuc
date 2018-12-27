const data = require('./features/support/data')

const outputFolder = data.params.output

const nocolor = '--format-options \'{"colorsEnabled": false}\''
const browserGUI = '--world-parameters \'{"headless": false}\''
const parallel3 = '--parallel 3'
const staging = '--world-parameters \'{"env":"staging"}\''
const prod = '--world-parameters \'{"env":"prod"}\''
const jsonReport = '-f json:' + outputFolder + 'report.json'
const alwaysScreenshot = '--world-parameters \'{"screenshotsOn": ["failed", "passed"]}\''

module.exports = {
  nocolor,
  browserGUI,
  parallel3,
  staging,
  prod,
  jsonReport,
  alwaysScreenshot
}
