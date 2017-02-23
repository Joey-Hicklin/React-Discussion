var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var buildPostsSchema = new Schema({
    author : {
      type : Schema.ObjectId,
      ref : "users"
    },
    date_posted : Date,
    response_to : {
      type : Schema.ObjectId,
      ref : "posts"
    },
    response_in : Number,
    expiration : Date,
    statements : [
      {
        type : Schema.ObjectId,
        ref : "statements"
      }
    ]
});

const Post = mongoose. model('Posts', buildPostsSchema);
export default Post;