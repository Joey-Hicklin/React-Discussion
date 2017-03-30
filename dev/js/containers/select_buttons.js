import React, { Component } from 'react';
import SelectButtons from '../presentationals/select_buttons';
import * as actions from '../store/actions/postNum';
import { getAgreeNum, getNeutralNum, getDisagreeNum } from '../store/reducers/postNum';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class SmartSelectButtons extends Component{
	render(){
		const {...rest} = this.props;
		return (<SelectButtons
			{...rest}
		/>)
	}
}

const mapStateToProps = (state) => {
	return {
		agreeNum: getAgreeNum(state),
		neutralNum: getNeutralNum(state),
		disagreeNum: getDisagreeNum(state)
	}
};

export default connect(mapStateToProps, actions)(SmartSelectButtons);