const PuppeteerHelper = require('../../helper/PuppeteerHelper')

class CitiBase extends PuppeteerHelper {
  constructor () {
    super()
    this.signInButton = '[ng-click="OpenLogin()"]'
    this.signOutButton = '[ng-click="SignOutConfirm()"]'
    this.alreadyHaveAccount = '.terms-and-conditions-container > a.user-link.not-registered'
    this.loginEmail = '[name=loginEmail]'
    this.loginPass = '[data-ng-model="loginController.Password"]'
    this.loginSubmit = '.login-submit'

    this.spinner = '#citi-logo-gif'
  }

  async login (user, pass) {
    await this.page.click(this.signInButton)
    await this.page.click(this.alreadyHaveAccount)
    await this.waitForSelector(this.page, this.loginEmail)
    await this.page.type(this.loginEmail, user)
    await this.page.type(this.loginPass, pass)
    await this.page.click(this.loginSubmit)
  }

  async iAmSignedIn (timeout, retries) {
    return this.isSelectorPresent(this.page, this.signOutButton, timeout, retries)
  }

  async waitSpinnerToAppearAndDisappear () {
    // Wait until there are two spinner presents (one is hidden and always present)
    await this.page.waitForFunction(
      (selector) => document.querySelectorAll(selector).length === 1,
      { polling: 'mutation', timeout: 15000 },
      this.spinner)

    // Wait until there is only one spinner again
    await this.page.waitForFunction(
      (selector) => document.querySelectorAll(selector).length === 0,
      { polling: 'mutation' },
      this.spinner)
  }
}

module.exports = CitiBase
