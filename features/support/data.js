const urls = {
  prod: {
    citi: 'https://www.citihabitats.com/',
    newTaxi: 'https://newtaxi.corcoran.com/'
  },
  staging: {
    citi: 'https://staging.citihabitats.com/',
    newTaxi: 'https://staging-newtaxi.corcoran.com/'
  }
}

const viewports = {
  desktop: { width: 1600, height: 900 }
}

module.exports = {
  params: {
    headless: 'true',
    env: 'staging',
    viewport: viewports.desktop,
    output: './output/',
    screenshotsOn: ['failed']
  },

  get citiUrl () {
    return urls[this.params.env].citi
  },
  get newTaxiUrl () {
    return urls[this.params.env].newTaxi
  }
}
