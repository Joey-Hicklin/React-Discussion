import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from '../store/actions/topic_a';

import { getContent } from '../store/reducers/topics_r';

import FocusContent from '../presentationals/focus_content_p';




class SmartFocusContent extends Component{

	componentWillMount() {
		const {params, location} = this.props;

		if(location.pathname === "/"){
			// TODO check state and local storage first
			this.props.fetchDataByDate("");

		}else if(params.focusPath.length < 7){
			this.props.fetchDataByShortID(params.focusPath, location.pathname);
		}else if(params.focusPath.length < 25){
			console.log('FetchByStatementID');
		} // TODO else Catch
	}

	render(){
		const {...rest} = this.props;
		return (<FocusContent 
			{...rest}
		/>)
	}
}

const mapStateToProps = (state, { params }) => {
	return {
		content: getContent(state, params.focusPath)
	};
}

export default withRouter(connect(mapStateToProps, actions)(SmartFocusContent));
