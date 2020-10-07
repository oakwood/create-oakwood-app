import * as React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from '@material-ui/core/styles'
import createTheme from 'components/styles'

const theme = createTheme({})

function TestProvider(props) {
  const { children } = props

  // console.log('************************') // eslint-disable-line
  // console.log(theme) // eslint-disable-line
  // console.log('************************') // eslint-disable-line

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

TestProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default TestProvider
