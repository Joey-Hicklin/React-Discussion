import React, { Component } from 'react';
import SelectTopic from '../presentationals/select_topic';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class SmartSelectTopic extends Component{
	componentWillMount() {
		this.props.decodeFocusPath(this.props.topicToggle, this.props.focusPath);
	}

	render(){
		const {...rest} = this.props;
		return (<SelectTopic
			{...rest}
		/>)
	}
}

const mapStateToProps = (state) => (
	{
		currentTopic: ""
	}
);

const mapDispatchToProps = (dispatch) => (
	{
		decodeFocusPath: (topicToggle, focusPath) => {
			console.log(`
				Topic: ${topicToggle === 't' ? true : false}
				Focus Path: ${focusPath}`);
		}
	}
);

export default connect(mapStateToProps, mapDispatchToProps)(SmartSelectTopic);