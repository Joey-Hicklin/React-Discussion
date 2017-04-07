import React, { Component } from 'react';
import BigButtons from '../presentationals/big_buttons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class SmartBigButtons extends Component{
	
	render(){
		const {...rest} = this.props;
		return (<BigButtons
			{...rest}
		/>)
	}
}

const mapStateToProps = (state) => {
	return {
		
	}
};

export default connect(mapStateToProps)(SmartBigButtons);