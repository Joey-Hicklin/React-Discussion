import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from '../store/actions/posts_a';

import Reader from '../presentationals/reader_p';
import Post from '../presentationals/post_p';
import Statement from '../presentationals/statement_p';


class SmartReader extends Component{

	componentWillMount() {
		const {params, location, fetchPostData, focusID, statementID, statementPlace, shownPosts, shownPostsInfo, tracker} = this.props;
		const {query} = shownPostsInfo;
		const {focusPath} = params;
		const {style, sort, day, time} = location.query;
		const {postIsFetching, topicPostIsFetching} = tracker;

		if(focusID !== '' && !postIsFetching && !topicPostIsFetching){
			let sameID = focusPath.length < 7 ? shownPostsInfo.ID === focusID : shownPostsInfo.ID === statementID;

			let sameQuery = sameID && query.style === style && query.sort === sort && query.day === day && query.time === time ? true : false;
			if(shownPosts.length === 0 || !sameQuery){
				if(focusPath.length < 7){
					// console.log('topic mount fetch');
					fetchPostData(true, true, focusID, location.query);

				}else if (focusPath.length > 6 && focusPath.length < 26){
					let idObject = {
						post: focusID,
						statementID,
						statement: statementPlace
					};
					// console.log('statement mount fetch');
					fetchPostData(false, true, idObject, location.query);
				}else{
					console.log('Whaddaya doin?!');
				}
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		const {params, location, fetchPostData, focusID, statementID, statementPlace, shownPosts, shownPostsInfo, tracker} = nextProps;
		const {query} = shownPostsInfo;
		const {focusPath} = params;
		const {style, sort, day, time} = location.query;
		const {postIsFetching, topicPostIsFetching} = tracker;

		if(!postIsFetching && !topicPostIsFetching){
			let sameID = focusPath.length < 7 ? shownPostsInfo.ID === focusID : shownPostsInfo.ID === statementID;

			let sameQuery = sameID && query.style === style && query.sort === sort && query.day === day && query.time === time ? true : false;

			if(shownPosts.length === 0 || !sameQuery){
				if(focusPath.length < 7){
					// console.log('topic props fetch');
					fetchPostData(true, true, focusID, location.query);
					
				}else if (focusPath.length > 6 && focusPath.length < 26){

					let idObject = {
						post: focusID,
						statementID,
						statement: statementPlace
					};
					// console.log('statement props fetch');
					fetchPostData(false, true, idObject, location.query);
				}else{
					console.log('Whaddaya doin?!');
				}
			}
		}
	}

	render(){
		const {shownPosts, posts} = this.props;

		if(shownPosts[0] === false){
			return (
				<div>
					No posts were found, try a different search...
				</div>
			);
		}else{
			return(
				<Reader >
					{shownPosts.map( post => {

						let postWrapperClasses;
						switch(post.response_in){
							case 0:
								postWrapperClasses = 'agree';
								break;
							case 1:
								postWrapperClasses = 'neutral';
								break;
							case 2:
								postWrapperClasses = 'disagree';
								break;
							default:
								postWrapperClasses = '';
								break;
							
						}
						return(
							<Post
								className="post"
								key={post._id}
								postWrapperClasses = {postWrapperClasses}
							>
								{post.statements.map( (statement, i) => {


									return(
										<Statement
											className="statement"
											key={statement._id}
											postIdAndPlacement={post._id + i}
										>
											{statement.content}
										</Statement>
									)
								})}
							</Post>
						)
					})}
				</Reader>
			);
		}
	}
}

const mapStateToProps = (state, {params}) => {
	const {...trackerRest} = state.tracker;
	const {...postsRest} = state.posts;
	const {focusPath} = params;
	const {topics, posts} = state;

	return{
		tracker: {...trackerRest},
		posts: {...postsRest},
		shownPosts: actions.getShownPosts(state),
		shownPostsInfo: actions.getShownPostsInfo(state),
		focusID:
			focusPath.length > 6 ? focusPath.slice(0, -1)
			: topics[focusPath] ? topics[focusPath]._id
				: '',
		statementID: posts[focusPath.slice(0, -1)] ? posts[focusPath.slice(0, -1)].statements[focusPath.slice(-1)]._id : '',
		statementPlace: posts[focusPath.slice(0, -1)] ? focusPath.slice(-1) : ''
	}
}

export default withRouter(connect(mapStateToProps, actions)(SmartReader));
