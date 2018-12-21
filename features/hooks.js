// Dependencies
const { After, Before } = require('cucumber')
const data = require('./support/data')

Before(async function () {
  this.browser = await this.driver.launch({ headless: data.params.headless === 'true', args: ['--no-sandbox', '--disable-setuid-sandbox'] })
})

After(async function () {
  await this.browser.close()
})
