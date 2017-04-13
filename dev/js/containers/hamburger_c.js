import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const hamburger = (props, { params, location }) => (
	<div id="app">
      	<i className="fa fa-bars"></i>
		<div className="pageWrapper">
			{props.children}
		</div>
	</div>
);

export default hamburger;
