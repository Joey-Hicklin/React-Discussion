
export const topics = (state = {}, action) => {
	if(action){
		switch(action.type) {
			case 'RECIEVE_TOPIC':
				return Object.assign({}, state, {
					[action.payload[0].short_id]: {
							content: action.payload[0].content,
							dates_discussed: action.payload[0].dates_discussed
						}
					});
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
	if(typeof ID !== 'string'){
		return "...Loading"
	}else{
		return (state.topics[ID]) ? state.topics[ID].content : "...Loading"
	}
};
