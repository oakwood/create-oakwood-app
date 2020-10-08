import * as React from 'react'
import PropTypes from 'prop-types'
import classnames from 'clsx'
import Router from 'next/router'
import withStyles from '@material-ui/core/styles/withStyles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Backdrop from 'components/Backdrop'

export const styles = (theme) => ({
  root: {
    zIndex: theme.zIndex.appBar - 1,
  },
})

const AppLoader = React.forwardRef(function AppLoader(props, ref) {
  const { classes, className, ...other } = props

  const [loading, setLoading] = React.useState(false)

  const handleRouteChangeStart = React.useCallback(() => {
    setLoading(true)
  }, [])

  const handleRouteChangeComplete = React.useCallback(() => {
    setLoading(false)
  }, [])

  React.useEffect(() => {
    Router.events.on('routeChangeStart', handleRouteChangeStart)
    Router.events.on('routeChangeComplete', handleRouteChangeComplete)

    return () => {
      Router.events.off('routeChangeStart', handleRouteChangeStart)
      Router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [handleRouteChangeStart, handleRouteChangeComplete])

  return (
    <Backdrop
      className={classnames(classes.root, className)}
      open={loading}
      unmountOnExit
      ref={ref}
      {...other}
    >
      <CircularProgress />
    </Backdrop>
  )
})

AppLoader.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default withStyles(styles)(React.memo(AppLoader))
