import * as React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const RouterLink = React.forwardRef(function RouterLink(props, ref) {
  const { as, children, external, href, replace, scroll = false, shallow, ...other } = props

  // Render as a regular `a` tag if external link.
  if (external || /^https?:\/\//.test(href)) {
    return (
      <a href={href} rel="noopener noreferrer" target="_blank" ref={ref} {...other}>
        {children}
      </a>
    )
  }

  return (
    <Link as={as} href={href} replace={replace} scroll={scroll} shallow={shallow} passHref>
      <a ref={ref} {...other}>
        {children}
      </a>
    </Link>
  )
})

RouterLink.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
  external: PropTypes.bool,
  href: PropTypes.string.isRequired,
  replace: PropTypes.bool,
  scroll: PropTypes.bool,
  shallow: PropTypes.bool,
}

export default RouterLink
