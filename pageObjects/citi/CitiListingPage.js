const CitiBase = require('./CitiBase')

class CitiListingPage extends CitiBase {
  constructor (puppeteerPage) {
    super()
    this.page = puppeteerPage

    this.featuresSection = '.listing-features'
    this.featuresList = '.feature-tab-list'
    this.hiddenFeatures = '.hidden-features'

    this.listingTitle = '.citi_page--title'
    this.blackSection = '.scrolling-tabs'
    this.signUpButton = '.sign-up-button'
  }

  async pageLoaded () {
    return this.isSelectorPresent(this.page, this.featuresSection)
  }

  async onlyLimitedInformation () {
    let featuresAreHidden = await this.featuresAreHidden()
    let hiddenAddress = !(await this.hasAddressNumber())
    let noBlackSection = !(await this.hasBlackSection())
    let signUpButton = await this.hasSignUpButtonInFeaturesSection()

    return featuresAreHidden && hiddenAddress && noBlackSection && signUpButton
  }

  async featuresAreHidden () {
    // If the features are hidden, they have the class '.hidden-features'
    return this.isSelectorPresent(this.page, this.hiddenFeatures, 2000, 2)
  }

  async hasAddressNumber () {
    let address = await this.getText(this.page, this.listingTitle, 2000, 2)
    return /\d+ .*/.test(address)
  }

  async hasBlackSection () {
    return this.isSelectorPresent(this.page, this.blackSection, 2000, 2)
  }

  async hasSignUpButtonInFeaturesSection () {
    return this.isSelectorPresent(this.page, this.signUpButton, 2000, 2)
  }
}

module.exports = CitiListingPage
