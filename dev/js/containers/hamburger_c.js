import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from '../store/actions/topic_a';

import Hamburger from '../presentationals/hamburger_p';

import { fromShortID, toBase } from '../functions';

class hamburger extends Component {

	componentWillMount() {
		const {params, location, tracker, topics, fetchDataByDate, fetchDataByShortID, fetchPostByID} =  this.props;
		const {focusPath} = params;
		const {topicIsFetching, topicPostIsFetching, main} = tracker;

		topicIsFetching ? null
		: location.pathname === "/" ? main === '' ? fetchDataByDate("")
			: null
		: focusPath.length < 7 ? !topics[focusPath] ? fetchDataByShortID(focusPath)
			: null
		: focusPath.length > 6 && focusPath.length < 26 && !topicPostIsFetching ? fetchPostByID(focusPath.slice(0, -1))
			: null
	}

	componentWillReceiveProps(nextProps) {
		// console.log('hamburger props');
		const {params, location, fetchDataByDate, fetchDataByShortID, fetchPostByID, tracker, topics, posts} = nextProps;
		const {focusPath} = params;
		const {topicIsFetching, topicPostIsFetching, main} = tracker;

		topicIsFetching ? null
		: location.pathname === "/" ? main === '' ? fetchDataByDate("")
			: null
		: focusPath.length < 7 ? !topics[focusPath] ? fetchDataByShortID(focusPath)
			: null
		: !focusPath.length > 26 && !topicPostIsFetching && !posts[focusPath.slice(0, -1)] ? fetchPostByID(focusPath.slice(0, -1))
			: null
	}

	render(){
		const {...rest} = this.props;
		const Location = this.props.location.pathname.split('/');

		return(
			<Hamburger
				{...rest}
				Location={Location}
			/>
		)
	}
}

const mapStateToProps = (state, { params }) => {
	const {topics, posts, tracker} = state;

	return ({
		topics: {...topics},
		posts: {...posts},
		tracker: {...tracker}
		
	});
}

export default withRouter(connect(mapStateToProps, actions)(hamburger));
