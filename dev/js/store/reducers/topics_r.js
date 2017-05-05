
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
				const {post, id, data} = action.payload;

				if(post === false){
					let topic_shortID = filterObject(state, '_id', id);
					let { ...rest } = state[topic_shortID.name];
					return Object.assign({}, state, {
						[topic_shortID.name]: { ...rest,
							postNum: {
								agree: data.agree,
								neutral: data.neutral,
								disagree: data.disagree
							}
						}
					});
				}else{
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

export const getContent = (state, ID=state.tracker.main, topic = true) => {
		return (
			topic === true ? state.topics[ID] ? state.topics[ID].content
				: '...Loading'
			: state.posts[ID.slice(0, -1)] ? state.posts[ID.slice(0, -1)].statements[ID.slice(-1)].content
				: '...Loading'
		)
};

export const getTopicID = (state, shortID) => {
	return {}
};
