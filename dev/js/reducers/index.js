import {combineReducers} from "redux";
import loggedIn from "./logged_in";
import shownTopic from "./shown_topic";
import shownPost from "./shown_post";
import context from "./context";
import user from "./user";

const allReducers = combineReducers({
	loggedIn: loggedIn,
	shownTopic: shownTopic,
	shownPost: shownPost,
	context: context,
	user: user
});

export default allReducers;