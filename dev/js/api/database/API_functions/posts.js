var mongoose = require('mongoose');
import post from '../schemas/posts';
import Topic from '../schemas/topics';

const Post = module.exports = post;

module.exports.getNumMainPosts = (callback) => {
	let recentDate = Date.now()-7*24*60*60*1000;
	Topic.findOne(
		{$and:[
			{'dates_discussed.0':{ $lt:	Date.now() }},
			{'dates_discussed.0':{ $gt:	new Date(recentDate)}}
		] },
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

module.exports.getMainPosts = (style, callback) => {
	let recentDate = Date.now()-7*24*60*60*1000;
	Topic.findOne(
		{$and:[
			{'dates_discussed.0':{ $lt:	Date.now() }},
			{'dates_discussed.0':{ $gt:	new Date(recentDate)}}
		] },
		(err, mainTopic) => {
			Post.find({'response_main': mainTopic._id, 'response_in': style}, callback);
		}
	);
}

module.exports.getPosts = (style, id, callback) => {
	Post.find({'response_statement': id, 'response_in': style}, callback);
}



export default Post;
