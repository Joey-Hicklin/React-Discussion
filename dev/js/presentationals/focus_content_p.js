import React, { Component } from 'react';
import { Link } from 'react-router';

export default class FocusContent extends Component{
// TODO replace class with variable testing if active

	render(){
		const {topicSwitchClasses, topicSwitchText, rootContent, content, chevronL, chevronR, linkChevronL, linkChevronR} = this.props;

		return(
			<div className="topicWrapper xCenter">
				<Link to='/'>
					<div className={topicSwitchClasses}>{/* boolean testing current date, latest date_discussed, and expiration */}
						{topicSwitchText}
					</div>
				</Link>
				<div className="topicContent">
					<Link to={rootContent}>
						{content}
					</Link>
					
					<Link to={linkChevronL}>
						<i className={"fa fa-chevron-left chevron " + chevronL}></i>{/* boolean testing if another topic has been discussed earlier */}
					</Link>

					<Link to={linkChevronR}>
						<i className={"fa fa-chevron-right chevron " + chevronR}></i>{/* boolean testing expiration */}
					</Link>
				</div>
				{this.props.children}
			</div>
		)
	}
}