import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from '../store/actions/topic_a';

import { getContent } from '../store/reducers/topics_r';

import FocusContent from '../presentationals/focus_content_p';

import { fromShortID, toBase } from '../functions';




class SmartFocusContent extends Component{

	componentWillMount() {
		const {params, location} = typeof this.props.params === 'undefined' ? nextProps : this.props;

		if(location.pathname === "/"){
			// TODO check state and local storage first
			this.props.fetchDataByDate("");

		}else if(params.focusPath.length < 7){
			this.props.fetchDataByShortID(params.focusPath, location.pathname);
		}else if(params.focusPath.length < 25){
			console.log('FetchByStatementID');
		}else{ // TODO else Catch
			console.log("Whaddaya doin?!");
		}
	}

	componentWillReceiveProps(nextProps) {
		const {params, location, fetchDataByDate, fetchDataByShortID} = nextProps;

		if(location.pathname === "/"){
			// TODO check state and local storage first
			fetchDataByDate("");

		}else if(params.focusPath.length < 7){
			fetchDataByShortID(params.focusPath, location.pathname);
		}else if(params.focusPath.length < 25){
			console.log('FetchByStatementID');
		}else{ // TODO else Catch
			console.log("Whaddaya doin?!");
		}
	}

	render(){
		const {params, location} = this.props;
		const {...rest} = this.props;

		const shortID = typeof params.focusPath === 'undefined' ? this.props.getMainShortID : params.focusPath;
		const prevShortID = toBase(62, (fromShortID(shortID) -1));
		const nextShortID = toBase(62, (fromShortID(shortID) +1));
		const prevChevron = typeof params.initAction === 'undefined' ? prevShortID : prevShortID + '/' + params.initAction;
		const nextChevron = typeof params.initAction === 'undefined' ? nextShortID : nextShortID + '/' + params.initAction;

		if(location.pathname === "/" || params.focusPath === this.props.getMainShortID){
			if(typeof params.initAction === 'undefined' || params.initAction === 'read'){
				return (
					<FocusContent
						{...rest}
						rootContent={'/' + shortID}
						topicSwitchClasses="activeTopic"
						topicSwitchText="Active"
						linkChevronL={'/' + prevChevron}
						linkChevronR={'/' + nextChevron}
					/>
				)
			}else{
				return (
					<FocusContent
						{...rest}
						rootContent={'/' + shortID}
						topicSwitchClasses="activeTopic"
						topicSwitchText="Active"
						chevronL='inactive'
						chevronR='inactive'
					/>
				)
			}
		}else if(params.focusPath.length < 7){
			if(typeof params.initAction === 'undefined' || params.initAction === 'read'){
				return(
					<FocusContent
						{...rest}
						rootContent={'/' + shortID}
						topicSwitchClasses="inactiveTopic"
						topicSwitchText="Inactive"
						linkChevronL={'/' + prevChevron}
						linkChevronR={'/' + nextChevron}
					/>
				)
			}else{
				console.log('correct');
				return(
					<FocusContent
						{...rest}
						rootContent={'/' + shortID}
						topicSwitchClasses="inactiveTopic"
						topicSwitchText="Inactive"
						chevronL='inactive'
						chevronR='inactive'
					/>
				)
			}
		}else{
			console.log("Statement Content");
			return (
				<FocusContent 
					{...rest}
				/>
			)
		}
	}
}

const mapStateToProps = (state, { params }) => {
	return {
		content: getContent(state, params.focusPath),
		getMainShortID: typeof state.topic.main === 'undefined' ? "" : state.topic.main
	};
}

export default withRouter(connect(mapStateToProps, actions)(SmartFocusContent));
