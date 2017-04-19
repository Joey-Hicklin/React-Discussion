import { filterObject } from '../../functions';


export const posts = (state = {}, action) => {
	switch(action.type) {
		case 'RECIEVE_POST':
			return Object.assign({}, state, {
				
				});
			break;
		default:
			return state;
			break;
	}
}
