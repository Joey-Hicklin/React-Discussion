var mongoose = require('mongoose');
import post from '../schemas/posts';
import Topic from '../schemas/topics';

const Post = module.exports = post;

module.exports.getNumMainPosts = (topicId, callback) => {
	Topic.findOne(
		{ _id: topicId },
		(err, mainTopic) => {
			Post.aggregate([
				{$match: {response_main: mainTopic._id}},
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
		}
	);
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

module.exports.getMainPosts = (style, topicId, callback) => {
	let _id = mongoose.Types.ObjectId(topicId);
	Post.find({'response_main': _id, 'response_in': style}, callback);
}

module.exports.getPosts = (style, id, callback) => {
	Post.find({'response_statement': id, 'response_in': style}, callback);
}



export default Post;
