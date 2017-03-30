import React from 'react';
import SelectButtons from '../containers/select_buttons';


export default class selectLayout extends React.Component{

	render(){
		return(
			<div className="selectWrapper">
				<div className="topicTop xCenter">
					Should college be paid for by taxpayers?
				</div>
				<SelectButtons/>
			</div>
		)
	}
}