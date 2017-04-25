import { filterObject } from '../../functions';


export const posts = (state = {}, action) => {
	let newState = {};
	switch(action.type) {
		case 'RECIEVE_POST':
			
			action.payload.forEach( (post) => { // TODO make immutable
				newState[post._id] = {
					...post
				}
				delete newState[post._id]._id;
			});
			return Object.assign({}, state, {
				...newState
				});
			break;

		case 'RECIEVE_TOPIC_POST':
			action.payload.forEach( (post) => { // TODO make immutable
				newState[post._id] = {
					...post
				}
				delete newState[post._id]._id;
			});
			return Object.assign({}, state, {
				...newState
				});
			break;

		case 'RECIEVE_POST_NUM':
			const {data, post} = action.payload;

			if(post !== false){
				const postID = post.slice(0, -1);
				const i = post.slice(-1);
				const { ...postEntry } = state[postID];
				const { ...statements } = state[postID].statements;
				const { ...statement } = state[postID].statements[i];
				return Object.assign({}, state, {
					[postID]: {...postEntry, 
						statements: { ...statements,
							[i]: {...statement,
								postNum: {
									agree: data.agree,
									neutral: data.neutral,
									disagree: data.disagree
								}
							}
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
}
