import React, { Component } from 'react';
import SelectTopic from '../presentationals/select_topic';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class SmartSelectTopic extends Component{
	render(){
		const {...rest} = this.props;
		return (<SelectTopic
			{...rest}
		/>)
	}
}

const mapStateToProps = (state) => {
	return {
	}
};

export default connect(mapStateToProps, actions)(SmartSelectTopic);