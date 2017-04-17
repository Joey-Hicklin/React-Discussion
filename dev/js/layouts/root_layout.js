import React from 'react';

import FocusContent from '../containers/focus_content_c';
import BigButtons from '../containers/big_buttons_c';
import Hamburger from '../containers/hamburger_c';

const rootLayout = ({ params, location }) => (
	<Hamburger>
		<FocusContent params={params} location={location}>
			<BigButtons params={params} location={location} />
		</FocusContent>
	</Hamburger>
);

export default rootLayout;
