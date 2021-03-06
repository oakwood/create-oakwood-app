import * as React from 'react'
import Media from '@oakwood/oui/Media'
import BlockButton from './BlockButton'

export default {
  title: 'Components/BlockButton',
  component: BlockButton,
  argTypes: {
    overlayPlacement: {
      control: {
        type: 'select',
        options: ['background', 'foreground'],
      },
    },
  },
}

const Template = (args) => (
  <BlockButton {...args}>
    <Media component="img" src="//source.unsplash.com/600x300" />
  </BlockButton>
)

export const Default = Template.bind({})
Default.args = {
  href: 'https://material-ui.com/',
  overlayPlacement: 'foreground',
  disabled: false,
  selected: false,
}
