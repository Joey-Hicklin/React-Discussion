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
		// console.log('big buttons mount');
		const {location, params, focusID, tracker, agreeNum, fetchPostNumData} = this.props;
		const {postNumIsFetching, topicIsFetching} = tracker;
		const {focusPath} = params;

		if(location.pathname.indexOf('read') !== -1){
			if(focusID !== '' && !postNumIsFetching && !topicIsFetching && agreeNum === ''){
				if(focusPath.length < 7){
					// console.log('topic PostNum');
					fetchPostNumData(focusID);
				}else{
					// console.log('statement PostNum');
					fetchPostNumData(focusID, focusPath);
				}
				
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		// console.log('big buttons props');
		const {location, params, focusID, tracker, agreeNum, fetchPostNumData, posts} = nextProps;
		const {postNumIsFetching, topicIsFetching} = tracker;
		const {focusPath} = params;

		this.postSpeak =
			!focusPath ? 'blank focusPath'
				: !posts[focusPath.slice(0, -1)] ? 'Post fetch not recieved yet'
					: new Date(posts[focusPath.slice(0, -1)].expiration).getTime() > new Date().getTime() ? true
						: false;

		if(location.pathname.indexOf('read') !== -1){
			if(focusID !== '' && !postNumIsFetching && !topicIsFetching && agreeNum === ''){
				if(params.focusPath.length < 7){
					// console.log('topic PostNum');
					fetchPostNumData(focusID);
				}else{
					// console.log('statement PostNum');
					fetchPostNumData(focusID, focusPath);
				}
			}
		}
	}
	
	render(){
		const {...rest} = this.props;
		const {params, location, posts, tracker, focusID} = this.props;
		const ID =
			!params.focusPath ? tracker.main
				: params.focusPath;

		if(location.pathname.indexOf("read") === -1 && location.pathname.indexOf("speak") === -1){
			return (
				<BigButtons
				{...rest}
				titleText = ""
				spanClasses = "inactive"
				topLinkTo = {"/" + ID + "/read"}
				topClasses = "topRoot"
				topText = "Read"
				middleLinkTo = {"/" + ID + "/speak"}
				middleClasses = {location.pathname === "/" || params.focusPath === tracker.main || this.postSpeak === true ? "middleRoot" : "inactive"}
				middleText = "Speak"
				/>
			)

		}else{
			//topic shortID
			if(location.pathname.indexOf('read') !== -1){
				return(
					<BigButtons
					{...rest}
					titleText = "Show me responses that [are]..."
					topLinkTo = {"/" + ID + "/reader?style=0&sort=0&day=1&time=0"}
					topClasses = "topRead"
					topText = "Agree"
					topTextSpan = {this.props.agreeNum}
					middleLinkTo = {"/" + ID + "/reader?style=1&sort=0&day=1&time=0"}
					middleClasses = "middleRead"
					middleText = "Neutral"
					middleTextSpan = {this.props.neutralNum}
					bottomLinkTo = {"/" + ID + "/reader?style=2&sort=0&day=1&time=0"}
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
			console.log('Something went wrong');
			return (
				<BigButtons
					{...rest}
				/>
			)
		}
	}
}

const mapStateToProps = (state, { params }) => {
	const {focusPath} = params;
	const {posts, topics, tracker} = state;

	const focusItem =
		!focusPath ? 'root'
			: focusPath.length < 7 ? topics[focusPath] ? topics[focusPath]
				: ''
			: posts[focusPath.slice(0, -1)] ? posts[focusPath.slice(0, -1)].statements[focusPath.slice(-1)]
				: '';

	const mapRoot = Object.assign({}, {
		focusID: (Object.keys(topics).length === 0 && Object.keys(posts).length === 0) || focusItem === 'root' ? '' : focusItem._id,
		tracker:{...tracker},
		posts: {...posts}
	});	

	let mapCombo;
	if(location.pathname.indexOf('read') !== -1){
		const mapRead = {
			agreeNum: !focusItem ? "" : !focusItem.postNum ? "" : focusItem.postNum.agree,
			neutralNum: !focusItem ? "" : !focusItem.postNum ? "" : focusItem.postNum.neutral,
			disagreeNum: !focusItem ? "" : !focusItem.postNum ? "" : focusItem.postNum.disagree,
			
		};
		mapCombo = Object.assign({}, {...mapRoot, ...mapRead});
	}else{
		mapCombo = mapRoot;
	}
	return mapCombo
};

export default connect(mapStateToProps, actions)(SmartBigButtons);