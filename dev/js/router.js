import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import MainLayout from './layouts/main_layout';
import RootLayout from './layouts/root_layout';
import SelectLayout from './layouts/select_layout';

// TODO duplicate SelectLayout route, one for topics, one for statements

export default (
  <Router history={browserHistory}>
  		<Route component={MainLayout}>
  			<Route path="/(:focusPath)" component={RootLayout} />
  			<Route path="(:t/):focusPath/select" component={SelectLayout} />
  		</Route>
  </Router>
);
