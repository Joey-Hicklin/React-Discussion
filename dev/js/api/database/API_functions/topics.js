var mongoose = require('mongoose');
import topic from '../schemas/topics';

const Topic = module.exports = topic;

module.exports.getRecentTopics = (callback, limit) => {
	Topic.find({'dates_discussed.0': { $lt: Date.now() } }, callback).sort({'dates_discussed.0': -1}).limit(limit);
}

export default Topic;
