var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const statementsSchema = new Schema({
  _id : Schema.Types.ObjectId,
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
});

const postsSchema = new Schema({
    author : {
      type : Schema.ObjectId,
      ref : "users"
    },
    date_posted : Date,
    response_post : {
      type : Schema.ObjectId,
      ref : "posts"
    },
    response_statement : {
      type : Schema.ObjectId,
      ref : "Post.statements"
    },
    response_main : {
      type : Schema.ObjectId,
      ref : "topics"
    },
    response_in : Number,
    expiration : Date,
    overall_rating : Number,
    statements : [statementsSchema]
});

const Post = mongoose.model('Post', postsSchema);
export default Post;