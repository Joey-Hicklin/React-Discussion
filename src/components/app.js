import React from 'react';
import Display from './display';
import Context from './context';


export default class App extends React.Component{
	render(){
		return(
			<div>
				<Display />
				<Context />
			</div>
			)
	}
}