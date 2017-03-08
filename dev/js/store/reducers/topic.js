// get topic listed in url (after checking in local storage), or
// --> get current active topic (after checking local)

// set default state

const testDefault = {
	content:"Test Topic 1",
	dates_discussed: new Date("February 27, 2017 00:00:00")
};

export const topic = (state = testDefault, action) => {
	switch(action.type){
		case "GET_TOPIC":

			break;

		default:
			return state;
	}
}