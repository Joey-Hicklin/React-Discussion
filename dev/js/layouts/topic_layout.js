import React from 'react';
import Topic from '../containers/topic';
import BigButtons from '../containers/big_buttons';


const rootLayout = ({ params }) => (
	<div className="pageWrapper">
		<Topic topic={params.focusPath}/>
		<BigButtons />
	</div>
);

export default rootLayout;
