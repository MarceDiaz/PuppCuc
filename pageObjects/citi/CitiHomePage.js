const CitiSalesPage = require('./CitiSalesPage')
const CitiBase = require('./CitiBase')
const data = require('../../features/support/data.js')

class CitiHomePage extends CitiBase {
  constructor () {
    super()
    this.salesMenuDesktop = '#citiHd .citi_header--menu-item.sales a'
  }

  async get (browser) {
    await this.getUrl(browser, data.citiUrl)
  }

  async goToSales () {
    await this.waitForSelector(this.page, this.salesMenuDesktop)
    await this.page.click(this.salesMenuDesktop)
    return new CitiSalesPage(this.page)
  }
}

module.exports = CitiHomePage
