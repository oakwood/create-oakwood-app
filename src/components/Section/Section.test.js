import * as React from 'react'
import { getClasses, createMount } from '@material-ui/core/test-utils'
import { render } from 'test/utils'
import describeConformance from '@oakwood/oui/test-utils/describeConformance'
import Section from './Section'

// eslint-disable-next-line no-console
console.log('******************')
// eslint-disable-next-line no-console
console.log(render)

describe('<Section />', () => {
  const mount = createMount()
  let classes

  beforeAll(() => {
    classes = getClasses(<Section />)
  })

  describeConformance(<Section />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLElement,
    testComponentPropWith: 'span',
  }))
  mount.cleanUp()

  describe('should render with', () => {
    it('content of nested children', () => {
      const { getByTestId } = render(
        <Section data-testid="root">
          <img src="foo.jpg" alt="" data-testid="img" />
        </Section>,
      )
      expect(getByTestId('img')).toBeInTheDocument()
    })
  })
})
