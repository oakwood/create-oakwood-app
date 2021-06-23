// @inheritedComponent AppBar

import * as React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Badge from '@material-ui/core/Badge'
import { useDimensions } from 'utils'
import { useCheckoutSelection, useGlobal, useI18n } from 'api'
import RouterLink from 'containers/RouterLink'
import BrandIcon from 'components/icons/Brand'
import CartIcon from 'components/icons/Cart'
import SearchIcon from 'components/icons/Search'
import CloseIcon from 'components/icons/Close'
import MenuIcon from 'components/icons/Menu'
import AppBar from 'components/AppBar'
import IconButton from 'components/IconButton'
import Toolbar from 'components/Toolbar'
import { useApp } from '../AppContext'

const BREAKPOINT_KEY_DOWN = 'sm'
const BREAKPOINT_KEY_UP = 'md'

export const useStyles = makeStyles((theme) => ({
  root: {},
  transitions: {
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.shortest, // Match value of `IconButton`
    }),
  },
  transparent: {
    '&:not(:hover):not(:focus)': {
      backgroundColor: 'transparent',
      color: 'inherit',
    },
  },
  toolbarMobilePush: {
    [theme.breakpoints.down(BREAKPOINT_KEY_DOWN)]: {
      marginLeft: 'auto',
    },
  },
  toolbarDesktopPush: {
    [theme.breakpoints.up(BREAKPOINT_KEY_UP)]: {
      marginLeft: 'auto',
    },
  },
  salesToolbar: {
    padding: theme.spacing(0.5, 2),
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.getContrastText(theme.palette.text.primary),
    textAlign: 'center',
  },
  menuToolbar: {},
  menuButton: {},
  brandButton: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  brandIcon: {
    width: 'auto',
  },
  searchButton: {},
  cartButton: {},
}))

const AppHeader = React.memo(function AppHeader(props) {
  const {
    appBarColor,
    className,
    isCartMenuOpen,
    isNavMenuOpen,
    isSearchMenuOpen,
    isSomeMenuOpen,
    onCartMenuToggle,
    onNavMenuToggle,
    onSearchMenuToggle,
    ...other
  } = props
  const classes = useStyles(props)

  const { t } = useI18n()
  const { settings } = useGlobal()
  const [rootRef, dimensions] = useDimensions()

  const { totals: cartTotals } = useCheckoutSelection()
  const totalCartItems = React.useMemo(() => cartTotals?.totalQuantity ?? 0, [cartTotals])

  const [disableTransparency, setDisableTransparency] = React.useState(undefined)
  const syncDisableTransparency = React.useCallback(() => {
    setDisableTransparency(window.pageYOffset > 100)
  }, [])

  React.useEffect(() => {
    const handleScroll = () => {
      syncDisableTransparency()
    }

    if (appBarColor === 'auto') {
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }

    // Define `disableTransparency` value on `color` prop change, thereby
    // enabling transitions. Doing so negates flashing of header on page load
    // for pages that don't use `color="default"`.
    return syncDisableTransparency
  }, [appBarColor, syncDisableTransparency])

  let color = isSomeMenuOpen ? 'default' : appBarColor
  if (color === 'auto') {
    color = disableTransparency ? 'default' : 'transparent'
  }

  return (
    <AppBar
      className={clsx(
        classes.root,
        {
          [classes.transitions]: disableTransparency !== undefined, // Enable transitions once defined
          [classes.transparent]: color === 'transparent',
        },
        className,
      )}
      position={appBarColor === 'default' ? 'sticky' : 'fixed'}
      ref={rootRef}
      {...other}
    >
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
          :root {
            --coa-header-height: ${dimensions.height}px;
            --coa-initial-sticky-top: ${appBarColor === 'default' ? dimensions.height : 0}px;
            --coa-sticky-top: ${appBarColor !== 'transparent' ? dimensions.height : 0}px;
          }
        `,
        }}
      />

      {settings?.globalSalesBanner && (
        <div className={classes.salesToolbar}>{settings.globalSalesBanner}</div>
      )}

      <Toolbar className={classes.menuToolbar}>
        <IconButton
          className={classes.menuButton}
          onClick={onNavMenuToggle}
          edge="start"
          size="small"
          aria-haspopup="true"
          aria-expanded={isNavMenuOpen}
          aria-label={t(__translationGroup)`Toggle main menu`}
        >
          {isNavMenuOpen ? <CloseIcon /> : <MenuIcon style={{ background: 'red' }} />}
        </IconButton>

        <div className={classes.toolbarDesktopPush} />
        <div className={classes.toolbarMobilePush} />

        <IconButton
          className={classes.brandButton}
          component={RouterLink}
          href="/"
          edge="start"
          aria-label={t(__translationGroup)`Go to the homepage`}
        >
          <BrandIcon className={classes.brandIcon} />
        </IconButton>

        <IconButton
          className={classes.searchButton}
          onClick={onSearchMenuToggle}
          size="small"
          aria-haspopup="true"
          aria-expanded={isSearchMenuOpen}
          aria-label={t(__translationGroup)`Toggle search`}
        >
          {isSearchMenuOpen ? <CloseIcon /> : <SearchIcon />}
        </IconButton>

        <IconButton
          className={classes.cartButton}
          onClick={onCartMenuToggle}
          edge="end"
          size="small"
          aria-haspopup="true"
          aria-expanded={isCartMenuOpen}
          aria-label={t(__translationGroup)`Toggle cart menu`}
        >
          {isCartMenuOpen ? (
            <CloseIcon />
          ) : (
            <Badge badgeContent={totalCartItems} color="primary" overlap="circle">
              <CartIcon />
            </Badge>
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  )
})

AppHeader.propTypes = {
  appBarColor: PropTypes.oneOf(['default', 'transparent', 'auto']),
  className: PropTypes.string,
  isCartMenuOpen: PropTypes.bool,
  isNavMenuOpen: PropTypes.bool,
  isSearchMenuOpen: PropTypes.bool,
  isSomeMenuOpen: PropTypes.bool,
  onCartMenuToggle: PropTypes.func,
  onNavMenuToggle: PropTypes.func,
  onSearchMenuToggle: PropTypes.func,
}

function AppHeaderContainer(props) {
  const {
    appBarColor,
    hideHeader,
    isCartMenuOpen,
    isNavMenuOpen,
    isSearchMenuOpen,
    isSomeMenuOpen,
    onCartMenuToggle,
    onNavMenuToggle,
    onSearchMenuToggle,
  } = useApp()

  if (hideHeader) {
    return null
  }

  return (
    <AppHeader
      appBarColor={appBarColor}
      isCartMenuOpen={isCartMenuOpen}
      isNavMenuOpen={isNavMenuOpen}
      isSearchMenuOpen={isSearchMenuOpen}
      isSomeMenuOpen={isSomeMenuOpen}
      onCartMenuToggle={onCartMenuToggle}
      onNavMenuToggle={onNavMenuToggle}
      onSearchMenuToggle={onSearchMenuToggle}
      {...props}
    />
  )
}

export default AppHeaderContainer
