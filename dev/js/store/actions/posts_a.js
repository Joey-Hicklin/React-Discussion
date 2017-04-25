const FETCH_POST = 'FETCH_POST';
const RECIEVE_POST = 'RECIEVE_POST';
const RESET_SHOWN_POSTS = 'RESET_SHOWN_POSTS';
const SET_SHOWN_POSTS_INFO = 'SET_SHOWN_POSTS_INFO';

export const recievePost = (data) => ({
	type: RECIEVE_POST,
	payload: data
});

export const fetchPost = () => {
	return {
		type: FETCH_POST
	}
}

export const resetShownPosts = () => {
	return {
		type: RESET_SHOWN_POSTS
	}
}

export const setShownPostsInfo = (data) => {
	return {
		type: SET_SHOWN_POSTS_INFO,
		payload: data
	}
}

export const fetchPostData = (topicBool, initialBool, ID, query) => (dispatch) => {
	dispatch(fetchPost());
	console.dir(ID);
	ID = typeof ID === 'object' ? ID.statementID : ID;

	dispatch(setShownPostsInfo({ID, query}));
	if (initialBool) dispatch(resetShownPosts());

	const topic = topicBool ? 't/' : '';
	let options = '';
	for(let item in query){
		options = options+item+'='+query[item]+'&';
	}

	const fetchReq = 'http://127.0.0.1:8083/posts/'+topic+ID+'?'+options.slice(0,-1);
	console.log(fetchReq);
	return fetch(fetchReq).then(res =>{
		res.json().then( data => {
			if(data.length === 0){
				dispatch(recievePost([false]));
			}else{
				dispatch(recievePost(data));
			}
		});
	});
};


export const getShownPosts = (state) => state.tracker.shownPosts;
export const getShownPostsInfo = (state) => state.tracker.shownPostsInfo;
