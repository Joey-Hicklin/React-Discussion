import React from 'react';


export default class topic extends React.Component{
// TODO replace class with varibale testing if active
	render(){
		return(
			<div className="topicWrapper xCenter">
				<div className="activeTopic">
					Active
				</div>
				<div className="topicContent">
					Should college be paid for by taxpayers?
				</div>
				<i className="fa fa-chevron-left chevron"></i>
				<i className="fa fa-chevron-right chevron"></i>
			</div>
		)
	}
}