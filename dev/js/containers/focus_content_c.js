import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from '../store/actions/topic_a';

import { getContent } from '../store/reducers/topics_r';

import FocusContent from '../presentationals/focus_content_p';

import { fromShortID, toBase } from '../functions';




class SmartFocusContent extends Component{

	componentWillReceiveProps(nextProps) {
		// console.log('focus content props');
	}

	render(){
		const {params, location, getMainShortID} = this.props;
		const {focusPath} = params;
		const {...rest} = this.props;

		const initAction = location.pathname.split('/')[2];

		const shortID =
			focusPath ? focusPath
			: getMainShortID;

		const prevShortID = toBase(62, (fromShortID(shortID) -1));
		const nextShortID = toBase(62, (fromShortID(shortID) +1));

		// const postID =
		// 	focusPath ? focusPath.slice(0, -1)
		// 	: '';

		const prevChevron =
			!initAction ? prevShortID
			: prevShortID + '/' + initAction;

		const nextChevron =
			!initAction ? nextShortID
			: nextShortID + '/' + initAction;

		if(location.pathname === "/" || focusPath === getMainShortID){
			if(!initAction || initAction === 'read'){
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
		}else if(focusPath.length < 7){
			if(!initAction || initAction === 'read'){
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
			return (
				<FocusContent 
					{...rest}
					rootContent={'/' + shortID}
					topicSwitchClasses="inactive"
					chevronL='inactive'
					chevronR='inactive'
				/>
			)
		}
	}
}

const mapStateToProps = (state, { params }) => {
	const {focusPath} = params;

	const isTopic =
		!focusPath || focusPath.length < 7 ? true : false;

	return {
		content: getContent(state, focusPath, isTopic),
		getMainShortID: !state.tracker.main ? "" : state.tracker.main
	};
}

export default withRouter(connect(mapStateToProps, actions)(SmartFocusContent));
