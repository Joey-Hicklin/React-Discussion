import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from '../store/actions/posts_a';

import Reader from '../presentationals/reader_p';


class SmartReader extends Component{

	componentWillMount() {
		const {params, location, fetchPostData, focusID} = this.props;

		if(focusID !== ''){
			if(params.focusPath.length < 7){
				fetchPostData(true, true, focusID, location.query);
			}else if (params.focusPath.length >= 7 && params.focusPath.length < 25){
				fetchPostData(false, true, focusID, location.query);
			}else{
				console.log('Whaddaya doin?!');
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		const {params, location, fetchPostData, focusID} = nextProps;

		if(params.focusPath.length < 7){
			fetchPostData(true, true, focusID, location.query);
		}else if (params.focusPath.length >= 7 && params.focusPath.length < 25){
			fetchPostData(false, true, focusID, location.query);
		}else{
			console.log('Whaddaya doin?!');
		}
	}

	render(){
		const {...rest} = this.props;
		return(
			<Reader {...rest} />
		);
	}
}

const mapStateToProps = (state, {params}) => {
	return{
		focusID: params.focusPath.length > 6 ? params.focusPath : state.topics[params.focusPath] ? state.topics[params.focusPath]._id : ''
	}
}

export default withRouter(connect(mapStateToProps, actions)(SmartReader));
