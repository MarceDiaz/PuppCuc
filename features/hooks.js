// Dependencies
const { After, Before } = require('cucumber')
const data = require('./support/data')
const moment = require('moment')

const takeScreenshot = async function takeScreenshot (testCase, world) {
  let featureFile = testCase.sourceLocation.uri.split(/\\|\//).pop().split('.').shift()
  let status = (testCase.result.status === 'passed' ? 'OK' : 'ERR')
  let timestamp = moment().format('YYYYMMDD_HHmm')
  let screenshoot = await world.currentPage.takeScreenshot(timestamp + '-' + featureFile + '-' + status, data.params.output)

  world.attach(screenshoot, 'image/png')
}

// In Before and After hooks, this is binded to the world instance

Before(async function () {
  this.browser = await this.driver.launch({ headless: data.params.headless === 'true', args: ['--no-sandbox', '--disable-setuid-sandbox'] })
})

After(async function (testCase) {
  if (data.params.screenshotsOn.includes(testCase.result.status)) {
    await takeScreenshot(testCase, this)
  }

  await this.browser.close()
})
