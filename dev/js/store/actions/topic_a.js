import { fetchPostNum, recievePostNum, fetchPostNumData } from './postNum_a';

const FETCH_TOPIC = 'FETCH_TOPIC';
const FETCH_TOPIC_POST = 'FETCH_TOPIC_POST';
const RECIEVE_TOPIC = 'RECIEVE_TOPIC';
const RECIEVE_TOPIC_POST = 'RECIEVE_TOPIC_POST';

export const fetchTopic = () => {
	return {
		type: FETCH_TOPIC
	}
}

export const fetchTopicPost = () => {
	return {
		type: FETCH_TOPIC_POST
	}
}

export const recieveTopic = (data) => ({
	type: RECIEVE_TOPIC,
	payload: data
});

export const recieveTopicPost = (data) => ({
	type: RECIEVE_TOPIC_POST,
	payload: data
});

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

export const fetchPostByID = (ID) => (dispatch) => {
	dispatch(fetchTopicPost());

	return fetch('http://127.0.0.1:8083/topic/p/'+ID).then(res => {
		res.json().then( data => {
			dispatch(recieveTopicPost(data));
		});
	});
};
