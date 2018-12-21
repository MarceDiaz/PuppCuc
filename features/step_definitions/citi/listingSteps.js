const { Then } = require('cucumber')
const assert = require('assert')

Then(/^I see the listing page with limited information$/,
  async function () {
    assert(await this.currentPage.pageLoaded())
    assert(await this.currentPage.onlyLimitedInformation())
  }
)
