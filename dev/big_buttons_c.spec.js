import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import SmartBigButtons from './js/containers/big_buttons_c';

describe('<SmartBigButtons/>', function () {
  it('should know the location', function () {
    const wrapper = shallow(<SmartBigButtons/>);
    expect(wrapper.prop().location).length.to.be.above(0);
  });
});