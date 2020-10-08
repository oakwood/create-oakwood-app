import * as React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Collapse from '@material-ui/core/Collapse'
import { menuLinkType } from 'utils'
import RouterLink from 'containers/RouterLink'
import ExpandLessIcon from 'components/icons/ExpandLess'
import ExpandMoreIcon from 'components/icons/ExpandMore'
import List from 'components/List'
import ListItem from 'components/ListItem'
import ListItemText from 'components/ListItemText'

export const styles = {}

function AppNavDrawerListItem(props) {
  const { classes, level = 0, menuLink } = props

  const [expanded, setExpanded] = React.useState(false)
  const handleClick = React.useCallback(() => {
    setExpanded((prev) => !prev)
  }, [])

  const submenu = menuLink.links
  const hasSubmenu = submenu?.length > 0

  const topLinkProps = {}
  if (hasSubmenu) {
    topLinkProps.onClick = handleClick
  } else if (menuLink.url) {
    topLinkProps.component = RouterLink
    topLinkProps.href = menuLink.url
  }

  return (
    <>
      <ListItem button {...topLinkProps} style={{ paddingLeft: 16 + 8 * level }}>
        <ListItemText primary={menuLink.label} />

        {hasSubmenu && !expanded && <ExpandMoreIcon />}
        {hasSubmenu && expanded && <ExpandLessIcon />}
      </ListItem>

      {hasSubmenu && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {submenu.map((submenuLink, idx) => (
              <AppNavDrawerListItem
                key={idx}
                classes={classes}
                level={level + 1}
                menuLink={submenuLink}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  )
}

AppNavDrawerListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  level: PropTypes.number,
  menuLink: menuLinkType.isRequired,
}

export default withStyles(styles)(AppNavDrawerListItem)
