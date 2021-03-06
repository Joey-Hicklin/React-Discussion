import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import RootLayout from './layouts/root_layout';
import ViewerLayout from './layouts/viewer_layout';

// TODO rename TopicLayout to FocusedLayout, combine with SelectLayout

export default (
  <Router history={browserHistory}>
		<Route path="/(:focusPath)" component={RootLayout} >
			<Route path="read" component={RootLayout} >
			</Route>
			<Route path="speak" component={RootLayout} >
			</Route>
		</Route>
		<Route path="/:focusPath/reader" component={ViewerLayout} />
  </Router>
);
