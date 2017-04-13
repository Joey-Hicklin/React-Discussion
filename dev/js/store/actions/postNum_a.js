// import bigButtons from '../../containers/big_buttons_c';

const FETCH_POST_NUM = 'FETCH_POST_NUM';
const RECIEVE_POST_NUM = 'RECIEVE_POST_NUM';

export const fetchPostNum = () => ({
	type: FETCH_POST_NUM
})

export const recievePostNum = (data) => ({
	type: RECIEVE_POST_NUM,
	payload: data
})

export const fetchPostNumData = (id, topic) => (dispatch) => {

	dispatch(fetchPostNum());
	if(topic === true){
		return fetch('http://127.0.0.1:8083/posts/t/'+id).then(res => {
			res.json().then( data => {
				dispatch(recievePostNum({
					data,
					id,
					topic: true
				}));
				// bigButtons.forceUpdate( () => {
				// 	console.log('updated!');
				// });
			});
		});
	}else{
		return fetch('http://127.0.0.1:8083/posts/'+id).then(res => {
			res.json().then( data => {
				dispatch(recievePostNum({
					data,
					id,
					topic: false
				}));
			});
		});
	}
	
}