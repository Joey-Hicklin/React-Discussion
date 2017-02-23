import React from 'react';
import Topic from '../presentationals/topic';
import BigButtons from '../presentationals/big_buttons';


export default class rootLayout extends React.Component{

	render(){
		return(
			<div className="pageWrapper">
				<Topic />
				<BigButtons />
			</div>
		)
	}
}