import {combineReducers} from "redux";
import postNum from './postNum';

const topic = () => {

	const content = (state = "...Loading", action) => {
		switch(action.type) {
			case 'RECIEVE_TOPIC':
				return action.payload[0].content;
				break;
			default:
				return state;
				break;
		}
	};

	const id = (state = {}, action) => {
		switch(action.type) {
			case 'RECIEVE_TOPIC':
				return action.payload[0].short_id;
				break;
			default:
				return state;
				break;
		}
	};

	const isFetching = (state = false, action) => {
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

	return combineReducers({
		id,
		content,
		isFetching,
		postNum: postNum()
	});
};

export default topic;

export const getId = (state) => state.topic.id;
export const getContent = (state) => state.topic.content;
export const getIsFetching = (state) => state.topic.isFetching;
// export const getArrayTopic = (state) => state.topic.isFetching;
// export const getLocalTopic = (state) => state.topic.isFetching;
