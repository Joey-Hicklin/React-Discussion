var mongoose = require('mongoose');
import rating from '../schemas/ratings';
import Post from '../schemas/posts';

const Rating = module.exports = rating;

module.exports.getPostRatings = (id, callback) => {
	Post.findOne({'_id': id}, (err, post) => {
		Rating.find({statement: {$in: post.statements}}, callback);
	});
}

module.exports.getStatementRatings = (id, callback) => {
	Rating.findOne({'statement': id}, callback);
}

export default Rating;
