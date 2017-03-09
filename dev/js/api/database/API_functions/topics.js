var mongoose = require('mongoose');
import topic from '../schemas/topics';

const Topic = module.exports = topic;

module.exports.getRecentTopics = (callback, limit=5) => {
	if(isNaN(limit)){
		limit = 5;
	}
	Topic.find({'dates_discussed.0': { $lt: Date.now() } }, callback).sort({'dates_discussed.0': -1}).limit(limit);
}

module.exports.getFutureTopics = (callback, limit=5) => {
	if(isNaN(limit)){
		limit = 5;
	}
	Topic.find({'dates_discussed.0': { $gt: Date.now() } }, callback).sort({'dates_discussed.0': 1}).limit(limit);
}

export default Topic;
