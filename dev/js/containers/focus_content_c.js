import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from '../store/actions/topic_a';

import { getContent } from '../store/reducers/topics_r';

import FocusContent from '../presentationals/focus_content_p';

import { fromShortID, toBase } from '../functions';




class SmartFocusContent extends Component{

	render(){
		const {params, location} = this.props;
		const {...rest} = this.props;
		const initAction = location.pathname.split('/')[2];

		const shortID = typeof params.focusPath === 'undefined' ? this.props.getMainShortID : params.focusPath;
		const prevShortID = toBase(62, (fromShortID(shortID) -1));
		const nextShortID = toBase(62, (fromShortID(shortID) +1));
		const prevChevron = typeof initAction === 'undefined' ? prevShortID : prevShortID + '/' + initAction;
		const nextChevron = typeof initAction === 'undefined' ? nextShortID : nextShortID + '/' + initAction;

		if(location.pathname === "/" || params.focusPath === this.props.getMainShortID){
			if(typeof initAction === 'undefined' || initAction === 'read'){
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
			if(typeof initAction === 'undefined' || initAction === 'read'){
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
