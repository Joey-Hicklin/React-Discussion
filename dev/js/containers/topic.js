import React, { Component } from 'react';
import Topic from '../presentationals/topic';
import * as actions from '../store/actions/topic';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getIsFetching, getContent } from '../store/reducers/topics';


class SmartTopic extends Component{
	componentWillMount() {
		// if (this.props.arrayTopic === false) {
		// 	if (this.props.localTopic === false){
				this.props.fetchDataByShortID(this.props.focusPath);
		// 	}else{
		// 		// this.props.content = this.props.localTopic.content
		// 	}
		// } else{
		// 	// this.props.content = this.props.arrayTopic.content
		// }
	}

	render(){
		const {...rest} = this.props;
		return (<Topic 
			{...rest}
		/>)
	}
}

const mapStateToProps = (state, { params }) => {
	return {
		content: getContent(state, params.focusPath)
	};
}

export default withRouter(connect(mapStateToProps, actions)(SmartTopic));
