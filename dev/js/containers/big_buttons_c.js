import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getTopicID } from '../store/reducers/topics_r';

import * as postNum from '../store/actions/postNum_a';
import * as topic from '../store/actions/topic_a';
const actions = Object.assign({}, {...postNum, ...topic});

import BigButtons from '../presentationals/big_buttons_p';


class SmartBigButtons extends Component{

	componentWillMount() {
		
	}

	componentWillReceiveProps(nextProps, nextState) {

		if(nextProps.location.pathname.indexOf('read') !== -1){
			if(nextProps.topicID !== '0'){
				this.props.fetchPostNumData(nextProps.topicID, true);
			}
		}
	}
	
	render(){
		const {...rest} = this.props;
		const {params, location} = this.props;
		const ID = typeof params.focusPath === 'undefined' ? this.props.mainID : params.focusPath;

			if(location.pathname.indexOf("read") === -1 && location.pathname.indexOf("speak") === -1){
				return (
					<BigButtons
					{...rest}
					titleText = ""
					spanClasses = "inactive"
					topLinkTo = {ID + "/read"}
					topClasses = "topRoot"
					topText = "Read"
					middleLinkTo = {ID + "/speak"}
					middleClasses = {location.pathname === "/" || params.focusPath === this.props.mainID ? "middleRoot" : "inactive"}
					middleText = "Speak"
					/>
				)

			}else if(params.focusPath.length <= 6){
				//topic shortID
				if(location.pathname.indexOf('read') !== -1){
					return(
						<BigButtons
						{...rest}
						titleText = "Show me responses that [are]..."
						topLinkTo = {"/" + ID + "/read/agree"}
						topClasses = "topRead"
						topText = "Agree"
						topTextSpan = {this.props.agreeNum}
						middleLinkTo = {"/" + ID + "/read/neutral"}
						middleClasses = "middleRead"
						middleText = "Neutral"
						middleTextSpan = {this.props.neutralNum}
						bottomLinkTo = {"/" + ID + "/read/disagree"}
						bottomClasses = "bottomRead"
						bottomText = "Disagree"
						bottomTextSpan = {this.props.disagreeNum}
						/>
					)
				}else if(location.pathname.indexOf('speak') !== -1){
					return(
						<BigButtons
						{...rest}
						spanClasses = "inactive"
						titleText = "I'm responding in..."
						topLinkTo = {"/" + ID + "/speak/agree"}
						topClasses = "topSpeak"
						topText = "Agreement"
						middleLinkTo = {"/" + ID + "/speak/neutral"}
						middleClasses = "middleSpeak"
						middleText = "Neutrality"
						bottomLinkTo = {"/" + ID + "/speak/disagree"}
						bottomClasses = "bottomSpeak"
						bottomText = "Disagreement"
						/>
					)
				}

			}else{
				//statementID
				// if(location.pathname.indexOf('read') !== -1){

				// }else if(location.pathname.indexOf('speak') !== -1){
					
				// }
				console.log('Something went wrong');
			}
		return (
			<BigButtons
				{...rest}
			/>
		)
	}
}

const mapStateToProps = (state, { params }) => {
	const mapRoot = {
		mainID: state.topic.main
	};

	let mapCombo;
	if(location.pathname.indexOf('read') !== -1){
		const focusPath = state.topics[params.focusPath];
		const mapRead = {
			agreeNum: typeof focusPath === 'undefined' ? "0" : typeof focusPath.postNum === 'undefined' ? "0" : focusPath.postNum.agree,
			neutralNum: typeof focusPath === 'undefined' ? "0" : typeof focusPath.postNum === 'undefined' ? "0" : focusPath.postNum.neutral,
			disagreeNum: typeof focusPath === 'undefined' ? "0" : typeof focusPath.postNum === 'undefined' ? "0" : focusPath.postNum.disagree,
			topicID: Object.keys(state.topics).length === 0 || typeof focusPath === 'undefined' ? '0' : focusPath._id
		};
		mapCombo = Object.assign({}, {...mapRoot, ...mapRead});
	}else{
		mapCombo = mapRoot;
	}
	return mapCombo
};

export default connect(mapStateToProps, actions)(SmartBigButtons);