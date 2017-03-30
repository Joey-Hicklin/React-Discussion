import React, { Component } from 'react';
import {Link} from 'react-router';

export default class selectButtons extends Component{

	render(){
		return(
			<div className="selectButtonsWrapper xCenter">
				<div className="selectQuestion">
					Show me responses in:
				</div>
				<Link to="/topic/view/agree">
					<button className="agreeButton bigButton">
						Agreement <span>{this.props.agreeNum}</span>
					</button>
				</Link>
				<Link to="/topic/view/neutral">
					<button className="neutralButton bigButton">
						Neutrality <span>{this.props.neutralNum}</span>
					</button>
				</Link>
				<Link to="/topic/view/disagree">
					<button className="disagreeButton bigButton">
						Disagreement <span>{this.props.disagreeNum}</span>
					</button>
				</Link>
			</div>
		)
	}
}