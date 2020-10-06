import * as React from 'react'
import PropTypes from 'prop-types'
import classnames from 'clsx'
import withStyles from '@material-ui/core/styles/withStyles'
import StoryblokService from 'utils/storyblok-service'
import Container from 'components/Container'
import Html from 'components/Html'
import Section from 'components/Section'

export const styles = {
  root: {
    '@global': {
      'h1, h2, h3, h4, h5, h6, p, ol, ul, blockquote': {
        maxWidth: 480,
      },
      figure: {
        marginLeft: 'calc(var(--container-spacing, 0px) * -1)',
        marginRight: 'calc(var(--container-spacing, 0px) * -1)',
      },
      'figure img': {
        width: '100%',
      },
      '.wp-block-video, .wp-block-embed__wrapper': {
        display: 'block',
        position: 'relative',
        width: '100%',
        '&::before': {
          content: '""',
          display: 'block',
          paddingBottom: 'calc(9/16 * 100%)', // 16:9 aspect ratio
        },
        '& > *': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        },
      },
    },
  },
  content: {},
}

const Content = React.forwardRef(function Content(props, ref) {
  const { children, classes, className, content: contentProp, ...other } = props

  const content = StoryblokService?.client?.richTextResolver?.render(contentProp)

  return (
    <Section className={classnames(classes.root, className)} ref={ref} {...other}>
      <Container className={classes.content} maxWidth="md">
        <Html dangerouslySetInnerHTML={{ __html: content }} />
      </Container>
    </Section>
  )
})

Content.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  content: PropTypes.string,
}

export default withStyles(styles)(Content)
