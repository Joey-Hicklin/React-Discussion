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
		const {style, sort, day, time} = params;

		let Sort;

		// TODO debug day adjustment so it will work for previous dates

		const Day =
			moment().day() !== 0 ? day === '0' ? 7
				: day
			: day === '0' ? day
			: parseInt(day) - 7;

		// monday ===  -6  but should be  1
		// tuesday ===  -5  but should be  2
		// wednesday ===  -4  but should be  3
		/// thursday ===  -3  but should be  4
		// friday ===  -2  but should be  5
		// saturday ===  -1  but should be  6
		const dateTime = moment().day(Day).hour(time).toDate();
		console.log(dateTime);

		switch(sort){
			case "0":
				Sort = '-date_posted';
				break;
			case "1":
				Sort = 'date_posted';
				break;
			
		}
		const postsQuery = Object.assign({}, query, {
			'response_in': style,
			'date_posted': {$gte: dateTime}
		});

		Post.find(postsQuery)
		.sort(Sort)
		.exec(callback);
	}
}


export default Post;
