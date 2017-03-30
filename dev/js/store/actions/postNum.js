const FETCH_POST_NUM = 'FETCH_POST_NUM';
const RECIEVE_POST_NUM = 'RECIEVE_POST_NUM';

export const fetchPostNum = () => ({
	type: FETCH_POST_NUM
})

export const recievePostNum = (data) => ({
	type: RECIEVE_POST_NUM,
	payload: data
})

export const fetchData = (id) => (dispatch) => {
	dispatch(fetchPostNum());

	return fetch('http://127.0.0.1:8083/posts/'+id).then(res => {
		res.json().then( data => {
			dispatch(recievePostNum(data));
		});
	});
}