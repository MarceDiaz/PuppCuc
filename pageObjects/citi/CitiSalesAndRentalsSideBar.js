const CitiBase = require('./CitiBase')

class CitiSalesAndRentalsSideBar extends CitiBase {
  constructor (puppeteerPage) {
    super()

    this.page = puppeteerPage

    this.openHouse = '#openhouse-cb'
    this.openHouseTODAY = '[name="Today"]'
    this.openHouseMON = '[name="Monday"]'
    this.openHouseTUE = '[name="Tuesday"]'
    this.openHouseWED = '[name="Wednesday"]'
    this.openHouseTHU = '[name="Thursday"]'
    this.openHouseFRI = '[name="Friday"]'
    this.openHouseSAT = '[name="Saturday"]'
    this.openHouseSUN = '[name="Sunday"]'

    this.neighborhoodFilter = '.Borough .Filter-Box'
    this.okButton = '.Filter-Overlay.On .Ok'

    this.overlayChoices = '.Filter-Overlay.On .Choices .Choice'
    this.overlayHeader = '.Filter-Overlay.On .Header'
  }

  /**
   * Recieves an array with the desired days for the filter (TODAY,MON,TUE,WED,THU,FRI,SAT,SUN)
   * @param {string[]} days
   */
  async filterByOpenHouses (days) {
    await this.page.click(this.openHouse)

    for (const day of days) {
      let selector = this['openHouse' + day]
      if (!selector) {
        throw new Error('Invalid day ' + day)
      }
      if (await this.isSelectorPresent(this.page, selector, 600, 2)) {
        await this.page.click(selector)
        await this.waitSpinnerToAppearAndDisappear()
      }
    }
  }

  async deselectOpenHouseFilter () {
    await this.page.click(this.openHouse)
    await this.waitSpinnerToAppearAndDisappear()
  }

  async filterByBoroughAndNeighborhood (borough, neighborhood) {
    await this.page.click(this.neighborhoodFilter)
    await this.IamOnSelectBoroughScreen()
    await this.clickChoice(borough)
    await this.IAmOnSelectNeighborhoodFromBoroughScreen(borough)
    await this.clickChoice(neighborhood)
    await this.page.click(this.okButton)
    await this.waitSpinnerToAppearAndDisappear()
    /* There seems to be a race condition in which the results are
    sometimes updated after the loading spinner disapper and sometimes before */
    await this.page.waitFor(500)
  }

  async clickChoice (desiredChoice) {
    await this.page.evaluate(
      (choiceSelector, desiredChoice) => {
        let choices = Array.from(document.querySelectorAll(choiceSelector))
        let choiceToClick = choices.find((choice) => choice.innerText.trim() === desiredChoice.trim())
        choiceToClick.click()
      },
      this.overlayChoices, desiredChoice)
  }

  async IamOnSelectBoroughScreen () {
    return this.waitForOverlayTitleToBe('SELECT A BOROUGH')
  }

  async IAmOnSelectNeighborhoodFromBoroughScreen (borough) {
    let title = 'Neighborhoods in The ' + borough
    title = title.toUpperCase()
    return this.waitForOverlayTitleToBe(title)
  }

  async waitForOverlayTitleToBe (title) {
    await this.page.waitForFunction(
      (headerSelector, titleText) => {
        let title = document.querySelector(headerSelector)
        if (title) {
          return title.innerText === titleText
        }
        return false
      },
      { polling: 'mutation' },
      this.overlayHeader, title)
  }
}

module.exports = CitiSalesAndRentalsSideBar
