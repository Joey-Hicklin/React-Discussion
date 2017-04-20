import {combineReducers} from "redux";

import { loggedIn } from "./logged_in_r";
import tracker from "./tracker_r";
import { topics } from "./topics_r";
import { user } from "./user_r";
import { posts } from "./posts_r";

const allReducers = combineReducers({
	loggedIn,
	topics,
	tracker: tracker(),
	user,
	posts
});

export default allReducers;