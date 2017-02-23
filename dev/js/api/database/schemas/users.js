var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var buildUsersSchema = new Schema({
	name : {
	  first : {
	    type : Schema.ObjectId,
	    ref : "names"
	  },
	  middle : {
	    type : Schema.ObjectId,
	    ref : "names"
	  },
	  last : {
	    type : Schema.ObjectId,
	    ref : "names"
	  },
	},
	rating : {
	  averaged : Number,
	  last_rating : Date
	},
	posts : {
	  main : [
	    {
	      type : Schema.ObjectId,
	      ref : "posts"
	    }
	  ],
	  responses : [
	    {
	      type : Schema.ObjectId,
	      ref : "posts"
	    }
	  ]
	}
});

const User = mongoose. model('User', buildUsersSchema);

export default User;