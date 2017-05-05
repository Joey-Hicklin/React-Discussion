import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import BigButtons from '../big_buttons_c';

describe('<SmartBigButtons/>', function () {
  it('should know the location', function () {
    const wrapper = shallow(<SmartBigButtons/>);
    expect(wrapper.prop().location).length.to.be.above(0);
  });

  // it('should have props for email and src', function () {
  //   const wrapper = shallow(<Avatar/>);
  //   expect(wrapper.props().email).to.be.defined;
  //   expect(wrapper.props().src).to.be.defined;
  // });
});