// Based on: https://testing-library.com/docs/react-testing-library/setup#custom-render

import { render } from '@testing-library/react'
import TestProvider from './TestProvider'

export default function customRender(ui, options) {
  return render(ui, { wrapper: TestProvider, ...options })
}
