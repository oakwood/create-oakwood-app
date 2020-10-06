import * as React from 'react'
import PropTypes from 'prop-types'
import classnames from 'clsx'
import withStyles from '@material-ui/core/styles/withStyles'
import BackgroundMedia from '@oakwood/oui/BackgroundMedia'
import Media from '@oakwood/oui/Media'
import MediaReveal from '@oakwood/oui/MediaReveal'
import RouterLink from 'containers/RouterLink'
import Button from 'components/Button'
import Container from 'components/Container'
import Section from 'components/Section'
import Typography from 'components/Typography'

const BREAKPOINT_KEY_UP = 'sm'

export const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '75vh',
    color: theme.palette.getContrastText(theme.palette.text.primary),
    textAlign: 'center',
    [theme.breakpoints.up(BREAKPOINT_KEY_UP)]: {
      minHeight: 650,
    },
  },
  content: {},
  backgroundWrapperSticky: {
    top: 'var(--coa-sticky-top)',
    '$root:first-child &': {
      top: 'var(--coa-initial-sticky-top)',
    },
  },
  heading: theme.mixins.fluidType('sm', 'xl', 45, 132),
  excerpt: {
    ...theme.mixins.contain('sm'),
    marginTop: theme.spacing(2),
  },
  cta: {
    position: 'static',
    marginTop: 'calc(20px + 3vh)',
    // Make entire component clicable
    '&::before': {
      ...theme.mixins.absolute(0),
      content: '""',
    },
  },
})

const Hero = React.forwardRef(function Hero(props, ref) {
  const {
    backgroundAttachment = 'static',
    classes,
    className,
    ctaLabel,
    ctaUrl,
    excerpt,
    heading,
    image,
    ...other
  } = props

  return (
    <Section className={classnames(classes.root, className)} disableSpacing ref={ref} {...other}>
      {image && (
        <BackgroundMedia
          classes={{
            wrapperFixed: 'mui-fixed',
            wrapperSticky: classes.backgroundWrapperSticky,
          }}
          attachment={backgroundAttachment}
        >
          <MediaReveal>
            <Media src={image.filename} lazy />
          </MediaReveal>
        </BackgroundMedia>
      )}

      <Container className={classes.content} maxWidth="md">
        <Typography className={classes.heading} component="h1" variant="h2">
          {heading}
        </Typography>

        <Typography className={classes.excerpt}>{excerpt}</Typography>

        {ctaUrl && (
          <Button
            className={classes.cta}
            component={RouterLink}
            href={ctaUrl}
            color="inherit"
            variant="outlined"
          >
            {ctaLabel}
          </Button>
        )}
      </Container>
    </Section>
  )
})

Hero.propTypes = {
  backgroundAttachment: PropTypes.oneOf(['static', 'fixed', 'sticky']),
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  ctaLabel: PropTypes.string,
  ctaUrl: PropTypes.string,
  excerpt: PropTypes.string,
  heading: PropTypes.string,
  image: PropTypes.string,
}

export default withStyles(styles)(Hero)
