const { params } = require('../features/support/data.js')

class PuppeteerHelper {
  wrapPage (page) {
    let clickHandler = {
      apply: async (target, thisArg, args) => {
        let [ selector ] = args
        await this.waitForSelector(page, selector)
        return target.apply(thisArg, args)
      }
    }

    page.click = new Proxy(page.click, clickHandler)
  }

  /**
   * Given the target browser and a URL, creates a new tab in the browser, and opens the url
   * If browser is headless it will abort all the request with image in the created page
   * The created page is stored in this.page and returned
   * @param {Browser} browser
   * @param {string} url
   * @returns {Page}
   */
  async getUrl (browser, url, viewport = params.viewport) {
    this.page = await browser.newPage()
    this.wrapPage(this.page)

    await this.page.setViewport(viewport)
    if (await this.isBrowserHeadless(browser)) {
      await this.abortImageLoadingOnPage(this.page)
    }

    await this.page.goto(url, { waitUntil: 'load', timeout: 0 })

    return this.page
  }

  /**
   * Given a page, aborts all requests with type image
   * @param {Page} page
   */
  async abortImageLoadingOnPage (page) {
    await page.setRequestInterception(true)
    page.on('request', request => {
      if (request.resourceType() === 'image') { request.abort() } else { request.continue() }
    })
  }

  /**
   * Given a browser returns true if it is headless
   * @param {Browser} browser
   * NOTE: puppeteer api warns that browser.version() might change format in future version
   * If you find a better way for check this, please contribute
   */
  async isBrowserHeadless (browser) {
    let browserVersion = await browser.version()
    return /HeadlessChrome/.test(browserVersion)
  }

  async waitForSelector (page, selector, timeout = 0, retries = 3) {
    let tries = 0

    while (tries < retries) {
      try {
        let element = await page.waitForSelector(selector, { visible: true, timeout: timeout })
        await page.waitFor(100)
        await element.hover()
        return element
      } catch (error) {
        tries++
      }
    }
    throw new Error("Couldn't find " + selector)
  }

  async takeScreenshot (name, outputFolder, page = this.page) {
    return page.screenshot({
      path: outputFolder + name + '.png',
      type: 'png',
      fullPage: true
    })
  }

  async isSelectorPresent (page, selector, timeout, retries) {
    try {
      await this.waitForSelector(page, selector, timeout, retries)
      return true
    } catch (error) {
      return false
    }
  }

  async getText (page, selector, timeout, retries) {
    await this.waitForSelector(page, selector, timeout, retries)
    let text = await page.evaluate((selector) => document.querySelector(selector).innerText, selector)
    if (text === '') {
      text = await page.evaluate((selector) => document.querySelector(selector).value, selector)
    }

    return text
  }

  async getTextElement (page, element) {
    return page.evaluate((myEl) => myEl.innerText || myEl.value, element)
  }

  async clickUntilShows (page, selectorToClick, searchedSelector, retries) {
    let i = 0
    while (i < retries) {
      let clickButton = await this.isSelectorPresent(page, selectorToClick, 1000, 5)
      if (clickButton) {
        await page.click(selectorToClick)
        if (await this.isSelectorPresent(searchedSelector)) {
          i = retries
        } else {
          i++
        }
      } else {
        i = retries
      }
    }
    return this.isSelectorPresent(searchedSelector)
  }
  async clearDataAndType (page, elementHandle, data) {
    let lengthEl = (await this.getTextElement(page, elementHandle)).length

    await elementHandle.focus()
    await page.keyboard.up('Control')
    await page.keyboard.press('End', { delay: 50 })

    for (let i = 0; i < lengthEl; i++) {
      await page.keyboard.press('Backspace', { delay: 10 })
    }
    await elementHandle.type(data, { delay: 50 })
  }
  async waitForElementToAppearAndDisappear (page, selector, timeout, retries) {
    await this.waitForSelector(page, selector, timeout, retries)
    await page.waitForFunction(
      (selector) => !document.querySelector(selector),
      { polling: 'mutation' },
      selector)
  }
}

module.exports = PuppeteerHelper
