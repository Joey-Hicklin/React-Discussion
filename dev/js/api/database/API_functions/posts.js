import mongoose from 'mongoose';
import moment from 'moment';
import post from '../schemas/posts';
import Topic from '../schemas/topics';

const Post = module.exports = post;

module.exports.getMainPosts = (topicId, params={}, callback) => {
	const _id = mongoose.Types.ObjectId(topicId);
	if (Object.keys(params).length === 0){
		Post.aggregate([
			{$match: {response_main: _id}},
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
		
		Post.find({'response_main': _id, 'response_in': style, 'date_posted': {$gte: dateTime}})
		.sort(sort)
		.exec(callback);
	}
}

module.exports.getNumPosts = (statementId, callback) => {
	let _id = mongoose.Types.ObjectId(statementId);
	Post.aggregate([
		{$match: {'response_statement': _id}},
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
		}},{$sort: {_id: 1}}

	], callback);
}

// module.exports.getMainPosts = (style, topicId, callback) => {
// 	let _id = mongoose.Types.ObjectId(topicId);
// 	Post.find({'response_main': _id, 'response_in': style}, callback);
// }

module.exports.getPosts = (style, id, callback) => {
	Post.find({'response_statement': id, 'response_in': style}, callback);
}



export default Post;
