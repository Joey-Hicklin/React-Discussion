import React from 'react';
import {Link} from 'react-router';


export default class bigButton extends React.Component{

	render(){
		return(
			<div className="bigButtonWrapper xCenter">
				<Link to="topic/select">
					<button className="speechesButton bigButton">
						Read
					</button>
				</Link>
				<Link to="topic/respond">
					<button className="speakButton bigButton">
						Speak
					</button>
				</Link>
			</div>
		)
	}
}