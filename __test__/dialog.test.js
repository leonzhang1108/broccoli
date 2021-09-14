import { shallow } from 'enzyme'
import React from 'react'
import Dialog from '@/components/dialog'

test('dialog button', () => {
  const wrapper = shallow(
    <Dialog title="test title" visible confirmText="OK">
      Hello test
    </Dialog>
  )
  expect(wrapper).toMatchSnapshot()
})
