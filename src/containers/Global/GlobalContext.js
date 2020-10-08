import * as React from 'react'
import PropTypes from 'prop-types'

export const GlobalContext = React.createContext({})

if (process.env.NODE_ENV !== 'production') {
  GlobalContext.displayName = 'GlobalContext'
}

export function useGlobal() {
  return React.useContext(GlobalContext)
}

export function GlobalProvider(props) {
  const { children, menus, settings } = props

  // Change to `React.useState` if in need of conditionally updating values
  const { current: globalContext } = React.useRef({
    menus,
    settings,
  })

  return <GlobalContext.Provider value={globalContext}>{children}</GlobalContext.Provider>
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
  menus: PropTypes.object,
  settings: PropTypes.object,
}

export default React.memo(GlobalContext)
