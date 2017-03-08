import {combineReducers} from "redux";
import { loggedIn } from "./logged_in";
import { topic } from "./topic";
import { post } from "./post";
import { user } from "./user";

const allReducers = combineReducers({
	loggedIn: loggedIn,
	topic: topic,
	post: post,
	user: user
});

export default allReducers;