const CitiBase = require('./CitiBase')

class CitiGlobalSearchPage extends CitiBase {
  constructor (puppeteerPage) {
    super()
    this.page = puppeteerPage

    this.spinner = '#citi-logo-gif'

    this.propertiesResults = '.search-filter-tab.Properties'
    this.allPropertiesResults = '.global-search-row.ng-scope'
  }

  async goToPropertiesResults () {
    await this.waitForSelector(this.page, this.propertiesResults)
    await this.page.click(this.propertiesResults)
  }

  async getPropertyWithID (id) {
    return this.page.evaluateHandle(
      (allPropertiesSelector, id) => {
        var [ firstMatch ] = [...document.querySelectorAll(allPropertiesSelector)].filter(
          (result) => result.querySelector('.results-row-link').getAttribute('href').split('/').pop() === id
        )
        return firstMatch
      },
      this.allPropertiesResults, id
    )
  }

  async propertyHasLock (property) {
    return this.page.evaluate(
      (property) => property.querySelector('.lock_search') !== null,
      property
    )
  }

  async propertyWithIdHasLock (id) {
    let property = await this.getPropertyWithID(id)
    return this.propertyHasLock(property)
  }
}

module.exports = CitiGlobalSearchPage
