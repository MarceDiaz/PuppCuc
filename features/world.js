// Dependencies
const { setWorldConstructor } = require('cucumber')
const puppeteer = require('puppeteer')
const scope = require('./support/data')
const { setDefaultTimeout } = require('cucumber')

const World = function ({ attach, parameters }) {
  this.driver = puppeteer
  setDefaultTimeout(6000 * 1000)

  Object.assign(scope.params, parameters)
}

setWorldConstructor(World)
