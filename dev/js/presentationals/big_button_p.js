import React, { Component } from 'react';
import {Link} from 'react-router';


class bigButton extends Component{

	render(){
		return(
			<Link to={this.props.linkTo}>
				<button className={this.props.classes + " bigButton"}>
					{this.props.text}
				</button>
				<span className={this.props.spanClasses}>{this.props.textSpan}</span>
			</Link>
		)
	}
}

export default bigButton;
