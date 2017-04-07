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

export const fetchDataByShortID = (shortID) => (dispatch) => {
	dispatch(fetchTopic());

	return fetch('http://127.0.0.1:8083/topic/t/'+shortID).then(res => {
		res.json().then( data => {
			dispatch(recieveTopic(data));
		});
	});
};
