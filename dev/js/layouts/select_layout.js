import React from 'react';
import {Link} from 'react-router';


export default class selectLayout extends React.Component{

	render(){
		return(
			<div className="selectWrapper">
				<div className="topicTop xCenter">
					Should college be paid for by taxpayers?
				</div>
				<div className="selectButtonsWrapper xCenter">
					<div className="selectQuestion">
						Show me responses in:
					</div>
					<Link to="/topic/view/agree">
						<button className="agreeButton bigButton">
							Agreement
						</button>
					</Link>
					<Link to="/topic/view/neutral">
						<button className="neutralButton bigButton">
							Neutrality
						</button>
					</Link>
					<Link to="/topic/view/disagree">
						<button className="disagreeButton bigButton">
							Disagreement
						</button>
					</Link>
				</div>
			</div>
		)
	}
}