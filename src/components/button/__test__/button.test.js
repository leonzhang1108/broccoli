import { shallow } from 'enzyme'
import React from 'react'
import Button from '../index'

test('render button', () => {
  const wrapper = shallow(<Button>Hello test</Button>)
  expect(wrapper).toMatchSnapshot()
})
