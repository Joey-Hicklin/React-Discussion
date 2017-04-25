import React, { Component } from 'react';
import { Link } from 'react-router';

export default class statement extends Component{

	render(){
		const {statementWrapperClasses, postIdAndPlacement} = this.props;

		return(
			<Link to={'/'+postIdAndPlacement} >
				<div className={statementWrapperClasses+' statementWrapper'}>
					<div className="statementText">
						{this.props.children}
					</div>
				</div>
			</Link>
		)
	}
}
