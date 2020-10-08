// Based on https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_app.js

import * as React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { cmsProps as mockedCmsProps } from 'api/mock'
import theme from 'utils/theme.light'
import { AppProvider } from 'containers/App/AppContext'
import { GlobalProvider } from 'containers/Global/GlobalContext'
import AppBase from 'containers/App'
// As of NextJS 9, all global css *must* be imported in pages/_app.js
// https://github.com/zeit/next.js/blob/master/errors/css-global.md
import 'swiper/swiper-bundle.min.css'

/**
 * Monkey patches React to notify you about avoidable re-renders.
 * Based on: https://github.com/vercel/next.js/blob/canary/examples/with-why-did-you-render/pages/_app.js
 */
if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React, { trackAllPureComponents: true })
}

/**
 * Initialize polyfills
 * Based on: https://nextjs.org/docs/basic-features/supported-browsers-features#custom-polyfills
 */
if (typeof window !== 'undefined') {
  // eslint-disable-next-line global-require
  const smoothscroll = require('smoothscroll-polyfill')
  smoothscroll.polyfill()
}

function App(props) {
  const { Component, pageProps, cmsProps } = props

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>

      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />

      <GlobalProvider {...cmsProps}>
        <AppProvider>
          <AppBase>
            <Component {...pageProps} />
          </AppBase>
        </AppProvider>
      </GlobalProvider>
    </ThemeProvider>
  )
}

App.getInitialProps = async (props) => {
  const { Component, ctx } = props

  let cmsProps = {}
  if (ctx.req) {
    // @todo - Replace `mockedCmsProps` with cms fetch
    cmsProps = mockedCmsProps
  }

  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  return {
    cmsProps,
    pageProps,
  }
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
  cmsProps: PropTypes.object.isRequired,
}

export default App
