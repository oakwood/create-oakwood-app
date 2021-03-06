export { default } from '@material-ui/core/Container'

export const styles = (theme) => ({
  root: {
    paddingLeft: 'var(--coa-container-spacing)',
    paddingRight: 'var(--coa-container-spacing)',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 'var(--coa-container-spacing)',
      paddingRight: 'var(--coa-container-spacing)',
    },
  },
})
