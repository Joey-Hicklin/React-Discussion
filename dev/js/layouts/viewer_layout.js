import React from 'react';

import Hamburger from '../containers/hamburger_c';
import Reader from '../containers/reader_c';

const viewerLayout = ({ params, location }) => (
	<Hamburger params={params} location={location}>
		<Reader params={params} location={location} />
	</Hamburger>
);

export default viewerLayout;
