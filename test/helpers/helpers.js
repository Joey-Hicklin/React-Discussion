import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { expect } from 'chai';
import { mount, render, shallow } from 'enzyme';
import { fakeStore, fakeParams, fakeLocation } from '../fake_props';

const mockStore = configureMockStore([thunk]);

global.store = mockStore({...fakeStore});
global.fakeParams = fakeParams;
global.fakeLocation = fakeLocation;
global.Provider = Provider;
global.expect = expect;
global.mount = mount;
global.render = render;
global.shallow = shallow;