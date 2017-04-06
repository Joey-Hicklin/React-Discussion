import React from 'react';
import SelectButtons from '../containers/select_buttons';
import SelectTopic from '../containers/select_topic';


const selectLayout = ({ params }) => (
	<div className="selectWrapper">
		<SelectTopic 
			focusPath={params.focusPath}
			topicToggle={params.t}
		/>
		<SelectButtons/>
	</div>
)

export default selectLayout;
