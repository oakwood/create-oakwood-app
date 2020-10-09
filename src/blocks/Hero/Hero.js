import * as React from 'react'
import PropTypes from 'prop-types'
import classnames from 'clsx'
import { motion } from 'framer-motion'
import withStyles from '@material-ui/core/styles/withStyles'
import BackgroundMedia from '@oakwood/oui/BackgroundMedia'
import Media from '@oakwood/oui/Media'
import MediaReveal from '@oakwood/oui/MediaReveal'
import { mediaType } from 'utils'
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
  backgroundMedia: {
    backgroundColor: theme.palette.text.primary,
  },
  backgroundWrapperSticky: {
    top: 'var(--coa-sticky-top)',
    '$root:first-child &': {
      top: 'var(--coa-initial-sticky-top)',
    },
  },
  content: {},
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

const containerVariants = {
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
}

const itemVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 40 },
}

const MotionButton = motion.custom(Button)
const MotionTypography = motion.custom(Typography)

const Hero = React.forwardRef(function Hero(props, ref) {
  const {
    backgroundAttachment = 'static',
    backgroundMediaProps,
    classes,
    className,
    ctaLabel,
    ctaUrl,
    heading,
    excerpt,
    ...other
  } = props

  return (
    <Section className={classnames(classes.root, className)} disableSpacing ref={ref} {...other}>
      {backgroundMediaProps && (
        <BackgroundMedia
          classes={{
            root: classes.backgroundMedia,
            wrapperFixed: 'mui-fixed',
            wrapperSticky: classes.backgroundWrapperSticky,
          }}
          attachment={backgroundAttachment}
        >
          <MediaReveal>
            <Media
              {...(backgroundMediaProps?.component === 'video'
                ? { autoPlay: true, muted: true, loop: true, playsInline: true }
                : {})}
              {...backgroundMediaProps}
              lazy
            />
          </MediaReveal>
        </BackgroundMedia>
      )}

      <Container className={classes.content} maxWidth="md">
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          <MotionTypography
            className={classes.heading}
            component="h1"
            variant="h2"
            variants={itemVariants}
          >
            {heading}
          </MotionTypography>

          <MotionTypography className={classes.excerpt} variants={itemVariants}>
            {excerpt}
          </MotionTypography>

          {ctaUrl && (
            <MotionButton
              className={classes.cta}
              component={RouterLink}
              href={ctaUrl}
              color="inherit"
              variant="outlined"
              variants={itemVariants}
            >
              {ctaLabel}
            </MotionButton>
          )}
        </motion.div>
      </Container>
    </Section>
  )
})

Hero.propTypes = {
  backgroundAttachment: PropTypes.oneOf(['static', 'fixed', 'sticky']),
  backgroundMediaProps: mediaType,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  ctaLabel: PropTypes.string,
  ctaUrl: PropTypes.string,
  excerpt: PropTypes.string,
  heading: PropTypes.string,
}

export default withStyles(styles)(Hero)
