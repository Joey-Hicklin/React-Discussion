import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import allReducers from './store/reducers';
import router from './router';

const store = createStore(allReducers);

ReactDOM.render(
	<Provider store={store}>
		{router}
	</Provider>
, document.getElementById('nullspeakRoot'));