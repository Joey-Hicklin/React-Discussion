import { fetchPostNum, recievePostNum, fetchPostNumData } from './postNum_a';

const FETCH_TOPIC = 'FETCH_TOPIC';
const RECIEVE_TOPIC = 'RECIEVE_TOPIC';

export const recieveTopic = (data) => ({
	type: RECIEVE_TOPIC,
	payload: data
});

export const fetchTopic = () => {
	return {
		type: FETCH_TOPIC
	}
}

export const fetchDataByDate = (date) => (dispatch) => {
	dispatch(fetchTopic());

	return fetch('http://127.0.0.1:8083/topic/'+date).then(res => {
		res.json().then( data => {
			dispatch(recieveTopic(data));
		});
	});
};

export const fetchDataByShortID = (shortID, location) => (dispatch) => {
	dispatch(fetchTopic());

	return fetch('http://127.0.0.1:8083/topic/t/'+shortID).then(res => {
		res.json().then( data => {
			dispatch(recieveTopic(data));
			if(location.indexOf("read") !== -1){
				fetchPostNumDataAfter(data[0]._id, true, dispatch);
			}
		});
	});
};

const fetchPostNumDataAfter = (id, topic, dispatch) => {

	dispatch(fetchPostNum());
	if(topic === true){
		return fetch('http://127.0.0.1:8083/posts/t/'+id).then(res => {
			res.json().then( data => {
				dispatch(recievePostNum({
					data,
					id,
					topic: true
				}));
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
