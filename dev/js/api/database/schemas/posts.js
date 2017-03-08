var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var buildPostsSchema = new Schema({
    author : {
      type : Schema.ObjectId,
      ref : "users"
    },
    date_posted : Date,
    response_post : {
      type : Schema.ObjectId,
      ref : "posts"
    },
    response_main : {
      type : Schema.ObjectId,
      ref : "topics"
    },
    response_in : Number,
    expiration : Date,
    overall_rating : Number,
    statements : [
      {
        type : Schema.ObjectId,
        ref : "statements"
      }
    ]
});

const Post = mongoose.model('Post', buildPostsSchema);
export default Post;