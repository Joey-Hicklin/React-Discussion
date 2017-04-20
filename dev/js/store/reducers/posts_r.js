import { filterObject } from '../../functions';


export const posts = (state = {}, action) => {
	switch(action.type) {
		case 'RECIEVE_POST':
			const {payload} = action;
			let newState = {};
			payload.forEach( (post) => { // TODO make immutable
				newState[post._id] = {
					...post
				}
				delete newState[post._id]._id;
			});
			return Object.assign({}, state, {
				...newState
				});
			break;

		case 'RESET_SHOWN_POSTS':
			return {};
			break;

		default:
			return state;
			break;
	}
}
