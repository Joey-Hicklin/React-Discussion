import React, { Component } from 'react';
import { Link } from 'react-router';

export default class post extends Component{

	render(){
		const {postWrapperClasses} = this.props;

		return(
			<div className={postWrapperClasses + ' postWrapper'}>
				{this.props.children}
			</div>
		)
	}
}
