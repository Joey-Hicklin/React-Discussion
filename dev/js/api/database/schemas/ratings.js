var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let buildRatingsSchema = new Schema({
  statement: {
    type: Schema.ObjectId,
    ref: "statements"
  },
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
});

const Rating = mongoose.model('Ratings', buildRatingsSchema);
export default Rating;