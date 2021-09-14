import { shallow } from 'enzyme'
import React from 'react'
import Button from '@/components/button'

test('render button', () => {
  const wrapper = shallow(<Button>Hello test</Button>)
  expect(wrapper).toMatchSnapshot()
})
