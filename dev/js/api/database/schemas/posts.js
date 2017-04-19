var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var buildPostsSchema = new Schema({
    author : {
      type : Schema.ObjectId,
      ref : "users"
    },
    date_posted : Date,
    response_statement : {
      type : Schema.ObjectId,
      ref : "posts.statements"
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
        _id : mongoose.Types.ObjectId(),
        order: Number,
        content : String,
        current_edit: Boolean,
        edit_num: Number,
        ratings: {
          WS: [
            {
              user : {
                type : Schema.ObjectId,
                ref : "users"
              }
            }
          ],
          NH: [
            {
              user : {
                type : Schema.ObjectId,
                ref : "users"
              }
            }
          ],
          RI: [
            {
              user : {
                type : Schema.ObjectId,
                ref : "users"
              }
            }
          ]
        }
      }
    ]
});

const Post = mongoose.model('Post', buildPostsSchema);
export default Post;