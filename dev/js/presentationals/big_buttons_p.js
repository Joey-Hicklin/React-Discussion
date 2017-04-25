import React, { Component } from 'react';
import {Link} from 'react-router';

import BigButton from './big_button_p';


class bigButtons extends Component{

	componentWillMount() {
		this.buttons = (params, location) => {
			const { topLinkTo, middleLinkTo, bottomLinkTo, topClasses, middleClasses, bottomClasses, topText, middleText, bottomText, topTextSpan, middleTextSpan, bottomTextSpan, spanClasses } = this.props;
			
			if(location.pathname.indexOf("read") === -1 && location.pathname.indexOf("speak") === -1){
				return (
					<div className="bigButtonWrapper xCenter">
						<BigButton 
						spanClasses = {spanClasses}
						linkTo={topLinkTo}
						classes={topClasses}
						text={topText}
						/>
						<BigButton 
						spanClasses = {spanClasses}
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
						spanClasses={spanClasses}
						linkTo={topLinkTo}
						classes={topClasses}
						text={topText}
						textSpan={topTextSpan}
						/>
						<BigButton 
						spanClasses={spanClasses}
						linkTo={middleLinkTo}
						classes={middleClasses}
						text={middleText}
						textSpan={middleTextSpan}
						/>
						<BigButton 
						spanClasses={spanClasses}
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
		return (
			<div className="buttonTitle">
				{this.props.titleText}
				{this.buttons(this.props.params, this.props.location)}
			</div>
		)
	}
}

export default bigButtons;
