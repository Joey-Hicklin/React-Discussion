var mongoose = require('mongoose');
import topic from '../schemas/topics';

const Topic = module.exports = topic;

module.exports.getTopic = (callback, date=Date.now()) => {
	if(isNaN(date) || date.length !== 8){
		date = Date.now();
	} else{
		let day = parseInt(date.slice(2,4));
		let month = parseInt(date.slice(0,2))-1;
		let year = parseInt(date.slice(4,8));
		date = new Date(year, month, day);
	}
	const endDate = new Date(date-7*24*60*60*1000);
	Topic.find().elemMatch('dates_discussed', {$lte: date, $gte: endDate}).limit(1).exec(callback);
}

export default Topic;
