import {combineReducers} from "redux";
import postNum from './postNum';

const topic = () => {

	// const content = (state = "...Loading", action) => {
	// 	switch(action.type) {
	// 		case 'RECIEVE_TOPIC':
	// 			return action.payload[0].content;
	// 			break;
	// 		default:
	// 			return state;
	// 			break;
	// 	}
	// };

	// const id = (state = {}, action) => {
	// 	switch(action.type) {
	// 		case 'RECIEVE_TOPIC':
	// 			return action.payload[0].short_id;
	// 			break;
	// 		default:
	// 			return state;
	// 			break;
	// 	}
	// };

	const main = (state = {}, action) => {
		switch(action.type) {
			case 'RECIEVE_TOPIC':

				let weekStart = new Date(Date.now());
				weekStart = new Date(weekStart.setDate(weekStart.getDate()-weekStart.getDay()+1));
				weekStart = weekStart.setHours(0,0,0,0);
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
		// id,
		// content,
		main,
		isFetching,
		postNum: postNum()
	});
};

export default topic;

export const getId = (state) => state.topic.id;

// export const getArrayTopic = (state) => state.topic.isFetching;
// export const getLocalTopic = (state) => state.topic.isFetching;
