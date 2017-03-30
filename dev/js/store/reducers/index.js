import {combineReducers} from "redux";
import { loggedIn } from "./logged_in";
import topic from "./topic";
import { topics } from "./topics";
import { user } from "./user";

const allReducers = combineReducers({
	loggedIn: loggedIn,
	topics: topics,
	topic: topic(),
	user: user
});

export default allReducers;