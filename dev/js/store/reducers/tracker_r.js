import {combineReducers} from "redux";
import moment from 'moment';

const topic = () => {

	const main = (state = "", action) => {
		switch(action.type) {
			case 'RECIEVE_TOPIC':

				let weekStart = moment().day() == 0 ? moment().day(-6).startOf('day') : moment().day(1).startOf('day');

				let latest = action.payload[0].dates_discussed.length-1;
				let recievedDate = Date.parse(new Date(action.payload[0].dates_discussed[latest]));

				if(recievedDate == weekStart){
					return action.payload[0].short_id;
				}else{
					return state;
				}
				break;
			default:
				return state;
				break;
		}
	};

	const topicIsFetching = (state = false, action) => {
		switch(action.type) {
			case 'FETCH_TOPIC':
				return true;
				break;
			case 'RECIEVE_TOPIC':
				return false;
				break;
			default:
				return state;
				break;
		}
	};

	const topicPostIsFetching = (state = false, action) => {
		switch(action.type) {
			case 'FETCH_TOPIC_POST':
				return true;
				break;
			case 'RECIEVE_TOPIC_POST':
				return false;
				break;
			default:
				return state;
				break;
		}
	};

	const postNumIsFetching = (state = false, action) => {
		switch(action.type) {
			case 'FETCH_POST_NUM':
				return true;
				break;
			case 'RECIEVE_POST_NUM':
				return false;
				break;
			default:
				return state;
				break;
		}
	};

	const postIsFetching = (state = false, action) => {
		switch(action.type) {
			case 'FETCH_POST':
				return true;
				break;
			case 'RECIEVE_POST':
				return false;
				break;
			default:
				return state;
				break;
		}
	};

	const shownPosts = (state = [], action) => {
		let newState = [];
		switch(action.type) {
			case 'RECIEVE_POST':
				// console.log('post recieved!!!!');
				// console.dir(action.payload);
				action.payload.forEach( (post) => {
					newState = newState.concat(post);
				});
				return state.concat(newState);
				break;
			case 'RESET_SHOWN_POSTS':
				return newState;
				break;
			default:
				return state;
				break;
		}
	}

	const shownPostsInfo = (state = {}, action) => {
		switch(action.type) {
			case 'SET_SHOWN_POSTS_INFO':
				return action.payload;
				break;
			default:
				return state;
				break;
		}
	}

	return combineReducers({
		main,
		topicIsFetching,
		topicPostIsFetching,
		postNumIsFetching,
		postIsFetching,
		shownPosts,
		shownPostsInfo
	});
};

export default topic;

export const getId = (state) => state.topic.main;
