import { shallow } from 'enzyme'
import React from 'react'
import Input from '@/components/input'

test('dialog button', () => {
  const wrapper = shallow(<Input placeholder="placeholder" />)
  expect(wrapper).toMatchSnapshot()
})
