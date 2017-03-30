var mongoose = require('mongoose');
import topic from '../schemas/topics';

const Topic = module.exports = topic;

module.exports.getTopic = (callback, date=Date.now()) => {
	if(isNaN(date)){
		date = Date.now();
	} else{
		date = new Date(date);
	}
	const endDate = new Date(date-7*24*60*60*1000);
	Topic.find().elemMatch('dates_discussed', {$lte: date, $gte: endDate}).limit(1).exec(callback);
}

export default Topic;
