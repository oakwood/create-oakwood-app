import { styles as MuiAppBar } from '../AppBar/AppBar'
import { styles as MuiBackdrop } from '../Backdrop/Backdrop'
import { styles as MuiButton } from '../Button/Button'
import { styles as MuiContainer } from '../Container/Container'
import { styles as MuiIconButton } from '../IconButton/IconButton'
import { styles as MuiToolbar } from '../Toolbar/Toolbar'
import * as privateOverrides from './privateOverrides'

export default function createOverrides(theme) {
  const overrides = {
    MuiAppBar,
    MuiBackdrop,
    MuiButton,
    MuiContainer,
    MuiIconButton,
    MuiToolbar,
    ...privateOverrides,
  }

  return Object.entries(overrides).reduce((acc, [muiName, styles]) => {
    acc[muiName] = typeof styles === 'function' ? styles(theme) : styles
    return acc
  }, {})
}
