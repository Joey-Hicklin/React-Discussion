import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from '../store/actions/topic_a';

import Hamburger from '../presentationals/hamburger_p';

import { fromShortID, toBase } from '../functions';

class hamburger extends Component {

	componentWillMount() {
		const {params, location, tracker} =  this.props;
		if(location.pathname === "/" && tracker.main === ''){
			// TODO local storage first
			
			this.props.fetchDataByDate("");

		}else if(params.focusPath.length < 7){
			this.props.fetchDataByShortID(params.focusPath);
		}else if(params.focusPath.length < 25){
			console.log('FetchByStatementID');
		}else{ // TODO else Catch
			console.log("Whaddaya doin?!");
		}
	}

	componentWillReceiveProps(nextProps) {
		const {params, location, fetchDataByDate, fetchDataByShortID, tracker, topics} = nextProps;

		if(tracker.topicIsFetching !== true){ // TODO if statement is not fetching
			if(location.pathname === "/"){
				if(tracker.main === ''){
					// TODO check local storage first
					fetchDataByDate("");
				}
			}else if(params.focusPath.length < 7){
				if(typeof topics[params.focusPath] === 'undefined'){
					fetchDataByShortID(params.focusPath);
				}
			}else if(params.focusPath.length < 25){
				console.log('FetchByStatementID');
			}else{ // TODO else Catch
				console.log("Whaddaya doin?!");
			}
		}
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
	const {...tracker} = state.tracker;
	const {...topics} = state.topics;

	return ({
		tracker: {...tracker},
		topics: {...topics}
	});
}

export default withRouter(connect(mapStateToProps, actions)(hamburger));
