// @inheritedComponent AppDrawer

import * as React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import makeStyles from '@material-ui/core/styles/makeStyles'
import SearchIcon from 'components/icons/Search'
import Container from 'components/Container'
import IconButton from 'components/IconButton'
import TextField from 'components/TextField'
import { useApp } from '../AppContext'
import AppDrawer from './AppDrawer'

export const useStyles = makeStyles((theme) => ({
  root: {
    '--drawer-top': 'var(--coa-header-height)',
    zIndex: `${theme.zIndex.appBar - 1} !important`,
  },
  paper: {
    backgroundColor: theme.palette.background.default,
  },
  form: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  textField: {},
  inputBase: {},
  input: {},
  submitButton: {},
}))

const AppSearchDrawer = React.memo(function AppSearchDrawer(props) {
  const { isSearchMenuOpen, onSearchMenuClose, ...other } = props
  const classes = useStyles(props)

  const valueRef = React.useRef('')
  const [value, setValue] = React.useState('')
  const handleChange = React.useCallback((event) => {
    valueRef.current = event.target.value
    setValue(event.target.value)
  }, [])

  const handleSubmit = React.useCallback((event) => {
    event.preventDefault()
    Router.push(`/search/${valueRef.current}`).then(() => window.scrollTo(0, 0))
  }, [])

  const submitButton = (
    <IconButton
      className={classes.submitButton}
      disabled={!value}
      type="submit"
      aria-label="Search"
    >
      <SearchIcon />
    </IconButton>
  )

  return (
    <AppDrawer
      classes={{
        root: classes.root,
        paper: classes.paper,
      }}
      onClose={onSearchMenuClose}
      open={isSearchMenuOpen}
      anchor="top"
      {...other}
    >
      <Container
        className={classes.form}
        onSubmit={handleSubmit}
        component="form"
        maxWidth="md"
        role="search"
        // iOS needs an "action" attribute for nice input: https://stackoverflow.com/a/39485162/406725
        // We default the action to "#" in case the preventDefault fails (just updates the URL hash)
        action="#"
      >
        <TextField
          className={classes.textField}
          placeholder="Search products"
          onChange={handleChange}
          value={value}
          InputProps={{
            className: classes.inputBase,
            endAdornment: submitButton,
          }}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          inputProps={{
            className: classes.input,
            autoCapitalize: 'off',
            autoComplete: 'off',
            autoCorrect: 'off',
            maxLength: 100,
            spellCheck: 'false',
          }}
          type="search"
          fullWidth
          autoFocus
        />
      </Container>
    </AppDrawer>
  )
})

AppSearchDrawer.propTypes = {
  isSearchMenuOpen: PropTypes.bool,
  onSearchMenuClose: PropTypes.func,
}

function AppSearchDrawerContainer(props) {
  const { isSearchMenuOpen, onSearchMenuClose } = useApp()

  return (
    <AppSearchDrawer
      isSearchMenuOpen={isSearchMenuOpen}
      onSearchMenuClose={onSearchMenuClose}
      {...props}
    />
  )
}

export default AppSearchDrawerContainer
