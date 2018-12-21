const { Then } = require('cucumber')
const assert = require('assert')

Then(/^I see the recorded listing with a lock in the Global Search results$/,
  async function () {
    await this.currentPage.goToPropertiesResults()
    let existsAndHasLock = await this.currentPage.propertyWithIdHasLock(this.lockedListingId)
    assert(existsAndHasLock)
  }
)
