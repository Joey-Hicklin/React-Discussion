import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from '../store/actions/topic_a';

import { fromShortID, toBase } from '../functions';

class hamburger extends Component {

	componentWillMount() {
		const {params, location} = typeof this.props.params === 'undefined' ? nextProps : this.props;

		if(location.pathname === "/"){
			// TODO check state and local storage first
			this.props.fetchDataByDate("");

		}else if(params.focusPath.length < 7){
			this.props.fetchDataByShortID(params.focusPath, location.pathname);
		}else if(params.focusPath.length < 25){
			console.log('FetchByStatementID');
		}else{ // TODO else Catch
			console.log("Whaddaya doin?!");
		}
	}

	componentWillReceiveProps(nextProps) {
		const {params, location, fetchDataByDate, fetchDataByShortID} = nextProps;

		if(location.pathname === "/"){
			// TODO check state and local storage first
			fetchDataByDate("");

		}else if(params.focusPath.length < 7){
			fetchDataByShortID(params.focusPath, location.pathname);
		}else if(params.focusPath.length < 25){
			console.log('FetchByStatementID');
		}else{ // TODO else Catch
			console.log("Whaddaya doin?!");
		}
	}

	render(){
		const Location = this.props.location.pathname.split('/');

		if(!Location.includes("reader")){
			return(
				<div id="app">
			      	<i className="fa fa-bars"></i>
					<div className="pageWrapper">
						{this.props.children}
					</div>
				</div>
			);
		}else if(Location.includes("reader")){
			return(
				<div id="app">
			      	<i className="fa fa-bars"></i>
			      	<form className="searchForm">
			      		<select name="style">
			      			<option value="0">Agree</option>
			      			<option value="1">Neutral</option>
			      			<option value="2">Disagree</option>
			      		</select>
			      		Sorted by
			      		<select name="sort">
			      			<option value="0">Most Recent</option>
			      			<option value="1">Oldest</option>
			      		</select>
			      		from
			      		<select name="day">
			      			<option value="1">Monday</option>
			      			<option value="2">Tuesday</option>
			      			<option value="3">Wednesday</option>
			      			<option value="4">Thursday</option>
			      			<option value="5">Friday</option>
			      			<option value="6">Saturday</option>
			      			<option value="0">Sunday</option>
			      		</select>
			      		at
			      		<select name="time">
			      			<option value="0">12 AM</option>
			      			<option value="1">1 AM</option>
			      			<option value="2">2 AM</option>
			      			<option value="3">3 AM</option>
			      			<option value="4">4 AM</option>
			      			<option value="5">5 AM</option>
			      			<option value="6">6 AM</option>
			      			<option value="7">7 AM</option>
			      			<option value="8">8 AM</option>
			      			<option value="9">9 AM</option>
			      			<option value="10">10 AM</option>
			      			<option value="11">11 AM</option>
			      			<option value="12">12 PM</option>
			      			<option value="13">1 PM</option>
			      			<option value="14">2 PM</option>
			      			<option value="15">3 PM</option>
			      			<option value="16">4 PM</option>
			      			<option value="17">5 PM</option>
			      			<option value="18">6 PM</option>
			      			<option value="19">7 PM</option>
			      			<option value="20">8 PM</option>
			      			<option value="21">9 PM</option>
			      			<option value="22">10 PM</option>
			      			<option value="23">11 PM</option>
			      		</select>
			      		<input type="submit" value="Search" />
			      	</form>
					<div className="pageWrapper">
						{this.props.children}
					</div>
				</div>
			);
		}

	}
}

const mapStateToProps = (state, { params }) => {
	return {
	};
}

export default withRouter(connect(mapStateToProps, actions)(hamburger));
