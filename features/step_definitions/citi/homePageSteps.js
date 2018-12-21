const { Given, When, Then } = require('cucumber')
const assert = require('assert')
let CitiHomePage = require('../../../pageObjects/citi/CitiHomePage')

Given(/^I access to CitiHabitats Home page$/,
  async function () {
    this.currentPage = new CitiHomePage()
    await this.currentPage.get(this.browser)
  }
)

When(/^I Sign In with a valid user: (.*) and pass: (.*)$/,
  async function (user, pass) {
    await this.currentPage.login(user, pass)
  }
)

Then(/^I am Signed in$/,
  async function () {
    assert(await this.currentPage.iAmSignedIn())
  }
)

Given(/^I am not signed in$/,
  async function () {
    assert(!(await this.currentPage.iAmSignedIn(5000, 1)))
  }
)

When(/^I go to sales$/,
  async function () {
    this.currentPage = await this.currentPage.goToSales()
    assert(await this.currentPage.pageLoaded())
  }
)

When(/^Search the recorded id in global Search$/,
  async function () {
    this.currentPage = await this.currentPage.globalSearch(this.lockedListingId)
  }
)
