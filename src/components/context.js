import React from 'react';

export default class Context extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			display: 'none'
		}
	}

	styleMenu(){
		window.contextMenu = this;
		const { display } = this.state;
		const contextMenuStyle = {
			display: display
		}
		return (contextMenuStyle);
	}

	render(){
		return(
			<div id='context' style={this.styleMenu()}></div>
		)
	}
}

document.addEventListener('contextmenu', function(e){
	e.preventDefault();
	window.eventTarget = e.target;

	document.addEventListener('keydown', escapeContext);
	function escapeContext(e){
		if(e.keyCode == 27){
			contextMenu.setState({
				display: 'none'
			});
		}
	}

	contextMenu.setState({
		display: 'block'
	});
});