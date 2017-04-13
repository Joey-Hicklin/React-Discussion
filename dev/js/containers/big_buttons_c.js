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
		const {params, location} = this.props;

		this.sortedFocusPath = () => {
			//if location is root or not select or view
			if(location.pathname === '/' || location.pathname){

				if(typeof params.focusPath === 'undefined'){
					return this.props.mainID;

				}else if(params.focusPath.length <= 6){
					return location.pathname;

				}else{
					return location.pathname;
				}
			}
		}
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

			if(typeof params.focusPath === 'undefined'){
				return (
					<BigButtons
					{...rest}
					topLinkTo = {this.props.mainID + "/read"}
					topClasses = ""
					topText = "Read"
					middleLinkTo = {this.props.mainID + "/speak"}
					middleClasses = ""
					middleText = "Speak"
					sortedFocusPath = {this.sortedFocusPath()}
					/>
				)

			}else if(params.focusPath.length <= 6){
				//topic shortID
				if(location.pathname.indexOf('read') !== -1){
					return(
						<BigButtons
						{...rest}
						topLinkTo = {"/" + this.props.mainID + "/read/agree"}
						topClasses = ""
						topText = "Agree"
						topTextSpan = {this.props.agreeNum}
						middleLinkTo = {"/" + this.props.mainID + "/read/neutral"}
						middleClasses = ""
						middleText = "Neutral"
						middleTextSpan = {this.props.neutralNum}
						bottomLinkTo = {"/" + this.props.mainID + "/read/disagree"}
						bottomClasses = ""
						bottomText = "Disagree"
						bottomTextSpan = {this.props.disagreeNum}
						sortedFocusPath = {this.sortedFocusPath()}
						/>
					)
				}else if(location.pathname.indexOf('speak') !== -1){
					return(
						<BigButtons
						{...rest}
						topLinkTo = {"/" + this.props.mainID + "/speak/agree"}
						topClasses = ""
						topText = "Agreement"
						middleLinkTo = {"/" + this.props.mainID + "/speak/neutral"}
						middleClasses = ""
						middleText = "Neutrality"
						bottomLinkTo = {"/" + this.props.mainID + "/speak/disagree"}
						bottomClasses = ""
						bottomText = "Disagreement"
						sortedFocusPath = {this.sortedFocusPath()}
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

			sortedFocusPath = {this.sortedFocusPath()}


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
			agreeNum: typeof focusPath === 'undefined' ? "" : typeof focusPath.postNum === 'undefined' ? "" : focusPath.postNum.agree,
			neutralNum: typeof focusPath === 'undefined' ? "" : typeof focusPath.postNum === 'undefined' ? "" : focusPath.postNum.neutral,
			disagreeNum: typeof focusPath === 'undefined' ? "" : typeof focusPath.postNum === 'undefined' ? "" : focusPath.postNum.disagree,
			topicID: Object.keys(state.topics).length === 0 ? '0' : focusPath._id
		};
		mapCombo = Object.assign({}, {...mapRoot, ...mapRead});
	}else{
		mapCombo = mapRoot;
	}
	return mapCombo
};

export default connect(mapStateToProps, actions)(SmartBigButtons);