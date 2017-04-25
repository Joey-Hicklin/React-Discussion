import React, { Component } from 'react';
import { Link } from 'react-router';

export default class reader extends Component{

	render(){
		const {readerWrapperClasses} = this.props;

		return(
			<div className={readerWrapperClasses + ' readerWrapper'}>
				{this.props.children}
			</div>
		)
	}
}
