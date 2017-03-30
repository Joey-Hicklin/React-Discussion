import React, { Component } from 'react';
import Topic from '../presentationals/topic';
import * as actions from '../store/actions/topic';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getIsFetching, getContent } from '../store/reducers/topic';


class SmartTopic extends Component{
	componentDidMount() {
		this.props.fetchData();
	}

	render(){
		const {...rest} = this.props;
		return (<Topic 
			{...rest}
		/>)
	}
}

const mapStateToProps = (state) => {
	return {
		content: getContent(state),
		isFetching: getIsFetching(state)
	};
}

export default connect(mapStateToProps, actions)(SmartTopic);
