import React, { Component } from 'react';
import {Link} from 'react-router';


class bigButton extends Component{

	render(){
		return(
			<div className="bigButtonWrapper xCenter">
				<Link to={"/t/" + this.props.focusPath + "/select"}>
					<button className="speechesButton bigButton">
						Read
					</button>
				</Link>
				<Link to={"/t/" + this.props.focusPath + "/respond"}>
					<button className="speakButton bigButton">
						Speak
					</button>
				</Link>
			</div>
		)
	}
}

export default bigButton;
