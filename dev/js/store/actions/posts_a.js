const FETCH_POST = 'FETCH_POST';
const RECIEVE_POST = 'RECIEVE_POST';

export const recievePost = (data) => ({
	type: RECIEVE_POST,
	payload: data
});

export const fetchPost = () => {
	return {
		type: FETCH_POST
	}
}

export const fetchPostData = (topicBool, ID, query) => (dispatch) => {
	dispatch(fetchPost());

	const topic = topicBool ? 't/' : '';
	let options = '';
	for(let item in query){
		options = options+item+'='+query[item]+'&';
	}

	const fetchReq = 'http://127.0.0.1:8083/posts/'+topic+ID+'?'+options.slice(0,-1);
	console.log('Fetching: ', fetchReq);
	return fetch(fetchReq).then(res =>{
		res.json().then( data => {
			console.dir(data);
			dispatch(recievePost(data));
		});
	});
};
