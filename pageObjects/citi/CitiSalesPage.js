const CitiBase = require('./CitiBase')
const CitiListingPage = require('./CitiListingPage.js')
const CitiSalesAndRentalsSideBar = require('./CitiSalesAndRentalsSideBar.js')
const CitiGlobalSearchPage = require('./CitiGlobalSearchPage')

class CitiSalesPage extends CitiBase {
  constructor (puppeteerPage) {
    super()
    this.page = puppeteerPage

    this.locators = {
      listings: '.listing-grid-wrapper',
      listingLock: '.ng-scope.lock_grid'
    }

    this.nextArrow = '.search-next'

    this.sideBar = new CitiSalesAndRentalsSideBar(this.page)

    this.listingBanner = '.listing-grid-container > .listing-grid-notification'

    this.globalSearchLens = '.citi_header--menu-link.search.ng-isolate-scope > span'
    this.globalSearchText = '#dev_site-search'
    this.globalSearchLensSubmit = '#dev_site-search-submit'

    // The class name is not very representative, but it is the best available, we should talk to frontend to change it when possible
    this.resultListingNeighborhood = '.listing-vitals-block .listing-vitals-beds'
  }

  async pageLoaded () {
    return this.isSelectorPresent(this.page, this.locators.listings)
  }

  /**
   * Returns all the listings with a lock
   * @param {*} listing
   */
  async getLockedListings () {
    return this.page.evaluateHandle(
      (locators) => Array.from(document.querySelectorAll(locators.listings))
        .filter(
          (listing) => listing.querySelector(locators.listingLock) !== null
        ),
      this.locators
    )
  }

  /**
   * Returns a promise that resolve to true if the page has any locked listing
   */
  async pageHasLockedListings () {
    let numberOfLockedListings = await this.page.evaluate(
      (lockedListings) => lockedListings.length,
      await this.getLockedListings()
    )
    return numberOfLockedListings !== 0
  }

  /**
   * Returns the listing's id
   * @param {JSHandle} listings
   */
  async getListingsIds (listings) {
    let ids = await this.page.evaluate(
      (listings) => listings.map(
        (listing) => {
          var href = listing.getAttribute('href')
          return href.split('/').pop()
        }
      ),
      listings
    )
    return ids
  }

  async getLockedListingsIds () {
    let lockedListings = await this.getLockedListings()
    let ids = await this.getListingsIds(lockedListings)
    return ids
  }

  async getFirstLockedListingId () {
    let [ firstId ] = (await this.getLockedListingsIds())
    return firstId
  }

  /**
   * Returns a promise that resolve to true if the a page with locks was found in less than maxRetries
   * @param {*} maxRetries
   */
  async navigateToPageWithLocks (maxRetries = 5) {
    let retries = 0
    while (!(await this.pageHasLockedListings()) && retries < maxRetries) {
      await this.nextPage()
      retries = retries + 1
    }
    return retries !== maxRetries
  }

  async nextPage () {
    await this.page.click('.search-next')
  }

  /**
   *
   * @param {JSHandle} listings
   */
  async clickFirstOfListings (listings) {
    await this.page.evaluate(
      (listings) => {
        let [ first ] = listings
        first.click()
      },
      listings
    )
  }

  async clickVowListing () {
    let lockedListings = await this.getLockedListings()
    await this.clickFirstOfListings(lockedListings)
    return new CitiListingPage(this.page)
  }

  async globalSearch (text) {
    await this.page.click(this.globalSearchLens)
    await this.page.type(this.globalSearchText, text)
    await this.waitForSelector(this.page, this.globalSearchLensSubmit)
    await this.page.click(this.globalSearchLensSubmit)
    await this.waitSpinnerToAppearAndDisappear()
    return new CitiGlobalSearchPage(this.page)
  }

  /**
   * Recieves an array with the desired days for the filter (TODAY,MON,TUE,WED,THU,FRI,SAT,SUN)
   * @param {string[]} days
   */
  async filterByOpenHouses (days) {
    await this.sideBar.filterByOpenHouses(days)
  }

  async deselectOpenHouseFilter () {
    await this.sideBar.deselectOpenHouseFilter()
  }

  async getOpenHouseListings () {
    return this.page.evaluateHandle(
      (allListingsSelector, listingBannerSelector) => {
        return Array.from(document.querySelectorAll(allListingsSelector)).filter(
          (listing) => {
            let listingBanner = listing.querySelector(listingBannerSelector)
            if (listingBanner) {
              let bannerText = listingBanner.innerText
              return /OPEN HOUSE/.test(bannerText)
            }
            return false
          }
        )
      },
      this.locators.listings, this.listingBanner
    )
  }

  async getAmountOfListingsInPage () {
    let allListings = await this.page.$$(this.locators.listings)
    return allListings.length
  }

  async allListingsAreOpenHouse () {
    let openHouseListings = await this.getOpenHouseListings()
    let amountOfOpenHouse = await this.page.evaluate(
      (listings) => listings.length,
      openHouseListings
    )

    let amountOfListingsInPage = await this.getAmountOfListingsInPage()
    return amountOfOpenHouse === amountOfListingsInPage
  }

  async filterByBoroughAndNeighborhood (borough, neighborhood) {
    await this.sideBar.filterByBoroughAndNeighborhood(borough, neighborhood)
  }

  async getResultsNeighborhoods () {
    return this.page.evaluate(
      (listingNeighborhoodSelector) => {
        // The neighborhood sometimes have the building type in the same DOM elemnt
        let neighborhoodsRaw = Array.from(document.querySelectorAll(listingNeighborhoodSelector))
        let neighborhoods = neighborhoodsRaw.map((listing) => listing.innerText.split('/').pop().trim())
        return neighborhoods
      },
      this.resultListingNeighborhood
    )
  }
  async resultsNeighborhoodContainedIn (expectedNeighborhoods) {
    let resultsNeighborhoods = await this.getResultsNeighborhoods()
    let originalNumberOfResults = resultsNeighborhoods.length
    resultsNeighborhoods = resultsNeighborhoods.filter((result) => expectedNeighborhoods.includes(result))
    return resultsNeighborhoods.length === originalNumberOfResults
  }
}

module.exports = CitiSalesPage
