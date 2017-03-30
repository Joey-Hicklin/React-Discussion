import React, { Component } from 'react';

export default class topic extends Component{
// TODO replace class with variable testing if active

	render(){
		return(
			<div className="topicWrapper xCenter">
				<div className="activeTopic">{/* boolean testing current date, latest date_discussed, and expiration */}
					Active
				</div>
				<div className="topicContent">
					{this.props.content}{/* content from /topic response */}
				</div>
				<i className="fa fa-chevron-left chevron"></i>{/* boolean testing if another topic has been discussed earlier */}
				<i className="fa fa-chevron-right chevron"></i>{/* boolean testing expiration */}
			</div>
		)
	}
}