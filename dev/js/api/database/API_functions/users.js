var mongoose = require('mongoose');
import user from '../schemas/users';

const User = module.exports = user;

module.exports.getUser = (id, callback) => {
	User.findOne({'_id': id}, callback);
}

export default User;
