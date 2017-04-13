import React, { Component } from 'react';
import {Link} from 'react-router';

import BigButton from './big_button_p';


class bigButtons extends Component{

	componentWillMount() {
		this.buttons = (params, location) => {
			const { topLinkTo, middleLinkTo, bottomLinkTo, topClasses, middleClasses, bottomClasses, topText, middleText, bottomText, topTextSpan, middleTextSpan, bottomTextSpan } = this.props;
			if(typeof params.focusPath === 'undefined'){
				return (
					<div className="bigButtonWrapper xCenter">
						<BigButton 
						linkTo={topLinkTo}
						classes={topClasses}
						text={topText}
						/>
						<BigButton 
						linkTo={middleLinkTo}
						classes={middleClasses}
						text={middleText}
						/>
					</div>

				)
			}else if(location.pathname.indexOf("read") !== -1 || location.pathname.indexOf("speak") !== -1){
				return (
					<div className="bigButtonWrapper xCenter">
						<BigButton 
						linkTo={topLinkTo}
						classes={topClasses}
						text={topText}
						textSpan={topTextSpan}
						/>
						<BigButton 
						linkTo={middleLinkTo}
						classes={middleClasses}
						text={middleText}
						textSpan={middleTextSpan}
						/>
						<BigButton 
						linkTo={bottomLinkTo}
						classes={bottomClasses}
						text={bottomText}
						textSpan={bottomTextSpan}
						/>
					</div>
				)
			}else{
				console.log("Something went wrong");
			}
		}
	}

	render(){
		return this.buttons(this.props.params, this.props.location)
	}
}

export default bigButtons;
