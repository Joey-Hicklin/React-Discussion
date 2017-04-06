import React, { Component } from 'react';

export default class selectTopic extends Component{

	render(){
		return (
			<div className="topicTop xCenter">
				{this.props.focusPath}
			</div>
		)
	}
}