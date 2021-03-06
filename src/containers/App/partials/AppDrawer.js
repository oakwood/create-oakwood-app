// @inheritedComponent Drawer

import * as React from 'react'
import PropTypes from 'prop-types'
import classnames from 'clsx'
import withStyles from '@material-ui/core/styles/withStyles'
import Drawer from '@material-ui/core/Drawer'

export const styles = (theme) => ({
  root: {},
  backdrop: {
    top: 'var(--drawer-top, 0px)',
  },
  paper: {
    ...theme.mixins.scrollbars,
    top: 'var(--drawer-top, 0px)',
    overflowX: 'hidden',
  },
  paperAnchorHorizontal: {
    width: 414, // iPhone 6/7/8 Plus
    maxWidth: '100%',
    height: 'calc(100% - var(--drawer-top, 0px))',
  },
})

const AppDrawer = React.forwardRef(function AppDrawer(props, ref) {
  const {
    anchor,
    BackdropProps: { className: BackdropClassName, ...BackdropProps } = {},
    children,
    classes,
    PaperProps: { className: PaperClassName, ...PaperProps } = {},
    ...other
  } = props

  return (
    <Drawer
      classes={{
        root: classes.root,
        paper: classnames(
          classes.paper,
          {
            [classes.paperAnchorHorizontal]: ['left', 'right'].includes(anchor),
          },
          PaperClassName,
        ),
      }}
      BackdropProps={{
        className: classnames(classes.backdrop, BackdropClassName),
        ...BackdropProps,
      }}
      PaperProps={PaperProps}
      anchor={anchor}
      ref={ref}
      {...other}
    >
      {children}
    </Drawer>
  )
})

AppDrawer.propTypes = {
  anchor: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
  BackdropProps: PropTypes.object,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  PaperProps: PropTypes.object,
}

export default withStyles(styles)(AppDrawer)
