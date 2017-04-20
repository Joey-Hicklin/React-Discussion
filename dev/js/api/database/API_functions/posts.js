import mongoose from 'mongoose';
import moment from 'moment';
import post from '../schemas/posts';
import Topic from '../schemas/topics';

const Post = module.exports = post;

module.exports.getPosts = (topic, topicId, params={}, callback) => {
	const _id = mongoose.Types.ObjectId(topicId);
	const focus = topic ? 'response_main' : 'response_statement';

	let query = {};
	query[focus] = _id;

	if (Object.keys(params).length === 0){
		Post.aggregate([
			{$match: query},
			{$group: {
				_id: {
					$cond: {
						if: {$eq: ["$response_in", 0]}, then: "agree", else:{
							$cond: {if: {$eq: ["$response_in", 1]}, then: "neutral", else:{
								$cond: {if: {$eq: ["$response_in", 2]}, then: "disagree", else:false}
							}}
						}
					}
				},
				count: {$sum: 1}
			}},
			{$sort: {_id: 1}}
		], callback);

	}else{
		const style = typeof params.style === 'undefined' ? "" : params.style;
		let sort = typeof params.sort === 'undefined' ? "" : params.sort;
		const day = typeof params.day === 'undefined' ? "" : params.day;
		const time = typeof params.time === 'undefined' ? "" : params.time;
		let dateTime = moment().day(day === '0' ? 7 : day).hour(time).toDate();

		switch(sort){
			case "0":
				sort = '-date_posted';
				break;
			case "1":
				sort = 'date_posted';
				break;
			
		}
		query = Object.assign({}, query, {
			'response_in': style,
			'date_posted': {$gte: dateTime}
		});

		console.dir(query);

		Post.find(query)
		.sort(sort)
		.exec(callback);
	}
}


export default Post;
