import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import MainLayout from './layouts/main_layout';
import RootLayout from './layouts/root_layout';
import SelectLayout from './layouts/select_layout';

// Layouts / Page Wrappers


// Pages / Containers


export default (
  <Router history={browserHistory}>
  		<Route component={MainLayout}>
  			<Route path="/" component={RootLayout} />
  			<Route path="topic/select" component={SelectLayout} />
  		</Route>
  </Router>
);