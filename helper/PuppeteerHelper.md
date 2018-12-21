# PuppeteerHelper

The purpose of this class is to provide functionality commonly needed in the the PageObjects. This is to increase code reusability, reduce the posibility of introducing error writting repetitive tasks over and over again and increase the developer's Quality of Life

Provided functions:

* [puppeteerHelper.getUrl(browser, url, viewport)](#puppeteerHelper.getUrlbrowser-url)

#### puppeteerHelper.getUrl(browser, url)
Given the target browser and a URL, creates a new tab in the browser, and opens the url. If browser is headless it will abort all the request with image in the created page. The created page is stored in `this.page` and returned.

* `browser` [\<Browser>](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-browser) The target browser
* `url` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The url to navigate page to
* `viewport` \<Object> The viewport to be used in the new page. **Optional** Defaults to the value set in `params.viewport` in [data.js](../features/support/data.js)
  - `width` \<number> page width in pixels. **required**
  - `height` \<number> page height in pixels. **required**
  - `deviceScaleFactor` \<[number]> Specify device scale factor (can be thought of as dpr). Defaults to `1`.
  - `isMobile` \<boolean> Whether the `meta viewport` tag is taken into account. Defaults to `false`.
  - `hasTouch`\<boolean> Specifies if viewport supports touch events. Defaults to `false`
  - `isLandscape` \<boolean> Specifies if viewport is in landscape mode. Defaults to `false`.

* returns: <Promise[\<Page>](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-page)> The created page