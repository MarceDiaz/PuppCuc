const { When, Then } = require('cucumber')
const assert = require('assert')

When(/^Navigate to a page with Locks$/,
  async function () {
    let navigatedToPageWithLocks = await this.currentPage.navigateToPageWithLocks()
    assert(navigatedToPageWithLocks)
  }
)

Then(/^I don't see any locks$/,
  async function () {
    assert(!(await this.currentPage.pageHasLockedListings()))
  }
)

When(/^Get the id of a locked listing$/,
  async function () {
    this.lockedListingId = await this.currentPage.getFirstLockedListingId()
  }
)

When(/^Click a VOW listing$/,
  async function () {
    this.currentPage = await this.currentPage.clickVowListing()
  }
)

When(/^I filter by open houses in all days$/,
  async function () {
    await this.currentPage.filterByOpenHouses(['TODAY', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'])
  }
)

When(/^I only see open house results$/,
  async function () {
    assert(await this.currentPage.allListingsAreOpenHouse())
  }
)

When(/^I deselect the open house filter$/,
  async function () {
    await this.currentPage.deselectOpenHouseFilter()
  }
)

Then(/^the open house filter is no longer applied$/,
  async function () {
    assert(!(await this.currentPage.allListingsAreOpenHouse()))
  }
)

When(/^I filter by borough (.*) and neighborhood (.*)$/,
  async function (borough, neighborhood) {
    await this.currentPage.filterByBoroughAndNeighborhood(borough, neighborhood)
  }
)

Then(/^I only see listings from (.*)$/,
  async function (neighborhoods) {
    // I accept a string with several neighborhoods separated by commas
    let splittedNeighborhoods = neighborhoods.split(',')
    assert(await this.currentPage.resultsNeighborhoodContainedIn(splittedNeighborhoods))
  }
)
