import {combineReducers} from "redux";

import { loggedIn } from "./logged_in_r";
import topic from "./topic_r";
import { topics } from "./topics_r";
import { user } from "./user_r";

const allReducers = combineReducers({
	loggedIn: loggedIn,
	topics: topics,
	topic: topic(),
	user: user
});

export default allReducers;