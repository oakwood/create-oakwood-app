import * as React from 'react'
import PropTypes from 'prop-types'
import classnames from 'clsx'
import withStyles from '@material-ui/core/styles/withStyles'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Media from '@oakwood/oui/Media'
import MediaReveal from '@oakwood/oui/MediaReveal'
import { ASPECT_RATIOS } from 'utils/constants'
import { useCheckoutHandlers } from 'api'
import { cartItemType } from 'utils'
import RouterLink from 'containers/RouterLink'
import AddIcon from 'components/icons/Add'
import CloseIcon from 'components/icons/Close'
import RemoveIcon from 'components/icons/Remove'
import BlockButton from 'components/BlockButton'
import Button from 'components/Button'
import IconButton from 'components/IconButton'
import Link from 'components/Link'
import Typography from 'components/Typography'

export const styles = (theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '80px 1fr auto',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),
  },
  actionButtons: {
    marginTop: 'auto',
  },
  actionButton: {
    minWidth: 35,
    padding: theme.spacing(0.5),
    // Reset hover effect if not of type button
    'span&:hover': {
      backgroundColor: 'transparent',
      cursor: 'auto',
    },
  },
  removeButton: {
    alignSelf: 'flex-start',
  },
})

const CartItem = React.forwardRef(function CartItem(props, ref) {
  const { cartItem, classes, className, ...other } = props

  const { decreaseItem, increaseItem, removeItem } = useCheckoutHandlers()
  const { product } = cartItem

  const handleIncrease = React.useCallback(
    (event) => {
      if (increaseItem) {
        increaseItem(event.currentTarget.value)
      }
    },
    [increaseItem],
  )

  const handleDecrease = React.useCallback(
    (event) => {
      if (decreaseItem) {
        decreaseItem(event.currentTarget.value)
      }
    },
    [decreaseItem],
  )

  const handleRemove = React.useCallback(
    (event) => {
      if (removeItem) {
        removeItem(event.currentTarget.value)
      }
    },
    [removeItem],
  )

  return (
    <article className={classnames(classes.root, className)} ref={ref} {...other}>
      <BlockButton component={RouterLink} href={`/product/${product.uri}`}>
        <MediaReveal {...ASPECT_RATIOS.product}>
          <Media
            component="img"
            src={product.media?.thumb?.[0]}
            alt={product.name}
            {...ASPECT_RATIOS.product}
          />
        </MediaReveal>
      </BlockButton>

      <div className={classes.content}>
        <Link component={RouterLink} href={`/product/${product.uri}`} variant="body2">
          {product.name}
        </Link>

        <Typography color="textSecondary" variant="body2">
          {cartItem.priceEach}
        </Typography>

        <ButtonGroup className={classes.actionButtons}>
          <Button className={classes.actionButton} onClick={handleDecrease} value={cartItem.id}>
            <RemoveIcon fontSize="small" />
          </Button>

          <Button
            className={classes.actionButton}
            component="span"
            tabIndex="-1"
            role={undefined}
            aria-disabled={undefined}
          >
            {cartItem.quantity}
          </Button>

          <Button className={classes.actionButton} onClick={handleIncrease} value={cartItem.id}>
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      </div>

      <IconButton
        className={classes.removeButton}
        onClick={handleRemove}
        value={cartItem.id}
        size="small"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </article>
  )
})

CartItem.propTypes = {
  cartItem: cartItemType.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default withStyles(styles)(CartItem)
