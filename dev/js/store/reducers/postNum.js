import {combineReducers} from "redux";

const postNum = () => {

	const agree = (state = 0, action) => {
		switch(action.type) {
			case 'RECIEVE_POST_NUM':
				return action.payload.agree;
				break;
			default:
				return state;
				break;
		}
	}

	const neutral = (state = 0, action) => {
		switch(action.type) {
			case 'RECIEVE_POST_NUM':
				return action.payload.neutral;
				break;
			default:
				return state;
				break;
		}
	}

	const disagree = (state = 0, action) => {
		switch(action.type) {
			case 'RECIEVE_POST_NUM':
				return action.payload.disagree;
				break;
			default:
				return state;
				break;
		}
	}

	const isFetching = (state = false, action) => {
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

	return combineReducers({
		agree,
		neutral,
		disagree,
		isFetching
	});
}

export default postNum;

export const getAgreeNum = (state) => state.topic.postNum.agree;  //TODO needs dynamic starting location for POST or TOPIC
export const getNeutralNum = (state) => state.topic.postNum.neutral;
export const getDisagreeNum = (state) => state.topic.postNum.disagree;