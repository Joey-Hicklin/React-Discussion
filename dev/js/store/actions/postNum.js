const FETCH_NUM_POSTS = 'FETCH_NUM_POSTS';
const RECIEVE_NUM_POSTS = 'RECIEVE_NUM_POSTS';

export const fetchNumPosts = () => ({
	type: FETCH_NUM_POSTS
})

export const recieveNumPosts = (data) => ({
	type: RECIEVE_NUM_POSTS,
	payload: data
})

export const fetchData = (id) => (dispatch) => {
	dispatch(fetchNumPosts());

	return fetch('http://127.0.0.1:8083/posts/'+id).then(res => {
		res.json().then( data => {
			dispatch(recieveNumPosts(data));
		});
	});
}