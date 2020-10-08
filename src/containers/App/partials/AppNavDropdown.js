import * as React from 'react'
import PropTypes from 'prop-types'
import classnames from 'clsx'
import { useRouter } from 'next/router'
import withStyles from '@material-ui/core/styles/withStyles'
import { useGlobal } from 'containers/Global/GlobalContext'
import RouterLink from 'containers/RouterLink'
import Button from 'components/Button'
import Container from 'components/Container'
import Link from 'components/Link'

export const styles = (theme) => ({
  root: {
    ...theme.mixins.absolute(0, 0, undefined),
    display: 'flex',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  navlist: {
    display: 'flex',
    margin: 0,
    pointerEvents: 'auto',
  },
  navlistItem: {},
  navlistItemButton: {
    ...theme.typography.subtitle1,
    minHeight: 'var(--toolbar-min-height)',
  },
  subnav: {
    ...theme.mixins.fixed('var(--coa-header-height)', 0, undefined),
    padding: theme.spacing(5, 0),
    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create(['visibility', 'opacity'], {
      duration: theme.transitions.duration.short,
    }),
    '$navlistItem:not(:hover):not(:focus-within) &': {
      visibility: 'hidden',
      opacity: 0,
    },
  },
  subnavInner: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  list: {
    display: 'grid',
    gridGap: theme.spacing(1),
    gridTemplateColumns: 'repeat(3, 1fr)',
    flex: '0 1 800px',
    margin: 0,
  },
  listItem: {},
  listItemLink: {},
  mediaContainer: {
    flex: '0 0 300px',
  },
})

const AppNavDropdown = React.forwardRef(function AppNavDropdown(props, ref) {
  const { classes, className, ...other } = props

  const router = useRouter()
  const { menus } = useGlobal()

  return (
    <nav
      key={router?.asPath} // Re-render on route change to close nav despite hovered.
      className={classnames(classes.root, className)}
      ref={ref}
      aria-label="Main navigation"
      {...other}
    >
      <ul className={classes.navlist}>
        {menus?.menuPrimary?.map((menuItem, idx) => {
          const submenu = menuItem.links
          const hasSubmenu = submenu?.length > 0

          const topLinkProps = {}
          if (menuItem.url) {
            topLinkProps.component = RouterLink
            topLinkProps.href = menuItem.url
          }

          return (
            <li key={idx} className={classes.navlistItem}>
              <Button className={classes.navlistItemButton} {...topLinkProps}>
                {menuItem.label}
              </Button>

              {hasSubmenu && (
                <div className={classes.subnav}>
                  <Container className={classes.subnavInner}>
                    <ul className={classes.list}>
                      {submenu.map((subMenuItem, idx2) => (
                        <li key={idx2} className={classes.listItem}>
                          <Link
                            className={classes.listItemLink}
                            component={RouterLink}
                            href={subMenuItem.url}
                            underline="hover"
                            variant="body1"
                          >
                            {subMenuItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <div className={classes.mediaContainer}>
                      {menuItem.mediaSrc && <img src={menuItem.mediaSrc} alt="" />}
                    </div>
                  </Container>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
})

AppNavDropdown.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default withStyles(styles)(React.memo(AppNavDropdown))
