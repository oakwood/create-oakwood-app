import * as React from 'react'

// Monkey patches React to notify you about avoidable re-renders.
// Based on: https://github.com/vercel/next.js/tree/canary/examples/with-why-did-you-render
if (process.env.NODE_ENV !== 'production') {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line global-require
    const whyDidYouRender = require('@welldone-software/why-did-you-render')
    whyDidYouRender(React, { trackAllPureComponents: true })
  }
}
