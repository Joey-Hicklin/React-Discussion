import React from 'react';
import Topic from '../containers/main_topic';
import BigButtons from '../containers/big_buttons';


const rootLayout = () => (
	<div className="pageWrapper">
		<Topic />
		<BigButtons />
	</div>
);

export default rootLayout;
