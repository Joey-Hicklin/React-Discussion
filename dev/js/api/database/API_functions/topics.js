var mongoose = require('mongoose');
import topic from '../schemas/topics';
import Post from '../schemas/posts';

const Topic = module.exports = topic;

module.exports.getTopicByDate = (callback, date=Date.now()) => {
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

module.exports.getTopicByShortID = (callback, shortID) => {
	Topic.find({'short_id': shortID}).limit(1).exec(callback);
}

module.exports.getPostByID = (callback, ID) => {
	const _id = mongoose.Types.ObjectId(ID);
	Post.find({'_id': _id}).limit(1).exec(callback);
}

export default Topic;
