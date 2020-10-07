const { JSDOM } = require('jsdom')

// We can use jsdom-global at some point if maintaining these lists is a burden.
const whitelist = [
  // required for fake getComputedStyle
  'CSSStyleDeclaration',
  'Element',
  'Event',
  'Image',
  'HTMLElement',
  'HTMLInputElement',
  'Node',
  'Performance',
  'document',
]
const blacklist = ['sessionStorage', 'localStorage']

function createDOM() {
  const dom = new JSDOM('', { pretendToBeVisual: true })
  global.window = dom.window

  // Not yet supported: https://github.com/jsdom/jsdom/issues/2152
  class Touch {
    constructor(instance) {
      this.instance = instance
    }

    get identifier() {
      return this.instance.identifier
    }

    get pageX() {
      return this.instance.pageX
    }

    get pageY() {
      return this.instance.pageY
    }

    get clientX() {
      return this.instance.clientX
    }

    get clientY() {
      return this.instance.clientY
    }
  }
  global.window.Touch = Touch

  // Not yet supported: https://github.com/jsdom/jsdom/issues/2032
  class IntersectionObserver {
    constructor(instance) {
      this.instance = instance
    }

    /* eslint-disable class-methods-use-this */
    get disconnect() {
      return null
    }

    observe() {
      return null
    }

    takeRecords() {
      return null
    }

    unobserve() {
      return null
    }
    /* eslint-enable class-methods-use-this */
  }
  global.window.IntersectionObserver = IntersectionObserver

  global.navigator = {
    userAgent: 'node.js',
  }

  Object.keys(dom.window)
    .filter((key) => !blacklist.includes(key))
    .concat(whitelist)
    .forEach((key) => {
      if (typeof global[key] === 'undefined') {
        global[key] = dom.window[key]
      }
    })
}

module.exports = createDOM
