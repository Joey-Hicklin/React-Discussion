import React from 'react';
import Topic from '../containers/main_topic';
import BigButtons from '../containers/big_buttons';


const rootLayout = ({ params }) => (
	<div className="pageWrapper">
		<Topic focusPath={params.focusPath}/>
		<BigButtons focusPath={params.focusPath}/>
	</div>
);

export default rootLayout;
