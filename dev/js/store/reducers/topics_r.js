import { filterObject } from '../../functions';


export const topics = (state = {}, action) => {
	if(action){
		switch(action.type) {
			case 'RECIEVE_TOPIC':
				return Object.assign({}, state, {
					[action.payload[0].short_id]: {
							_id: action.payload[0]._id,
							content: action.payload[0].content,
							dates_discussed: action.payload[0].dates_discussed
						}
					});
				break;

			case 'RECIEVE_POST_NUM':
				if(action.payload.topic === true){
					let topic_shortID = filterObject(state, '_id', action.payload.id);
					let { ...rest } = state[topic_shortID.name];
					return Object.assign({}, state, {
						[topic_shortID.name]: { ...rest,
							postNum: {
								agree: action.payload.data.agree,
								neutral: action.payload.data.neutral,
								disagree: action.payload.data.disagree
							}
						}
					});
				}else{
					// insert postNum data into Statement with key === ID
					return state;
				}
				
				break;
			default:
				return state;
				break;
		}
	} else{
		return state;
	}
}

export const getContent = (state, ID=state.topic.main) => {
		return (state.topics[ID]) ? state.topics[ID].content : "...Loading"
};

export const getTopicID = (state, shortID) => {
	return {}
};
