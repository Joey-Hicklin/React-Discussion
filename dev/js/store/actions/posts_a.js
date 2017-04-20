const FETCH_POST = 'FETCH_POST';
const RECIEVE_POST = 'RECIEVE_POST';
const RESET_SHOWN_POSTS = 'RESET_SHOWN_POSTS';

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

export const fetchPostData = (topicBool, initialBool, ID, query) => (dispatch) => {
	dispatch(fetchPost());
	if (initialBool) dispatch(resetShownPosts());

	const topic = topicBool ? 't/' : '';
	let options = '';
	for(let item in query){
		options = options+item+'='+query[item]+'&';
	}

	const fetchReq = 'http://127.0.0.1:8083/posts/'+topic+ID+'?'+options.slice(0,-1);
	return fetch(fetchReq).then(res =>{
		res.json().then( data => {
			dispatch(recievePost(data));
		});
	});
};
