var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var buildStatementsSchema = new Schema({
    content : String,
    has_edits : Boolean,
    new_edited : {
      type : Schema.ObjectId,
      ref : "statements"
    },
    edit_origin : {
      type : Schema.ObjectId,
      ref : "statements"
    },
    ratings : {
      WS : [
        {
          user : {
            type : Schema.ObjectId,
            ref : "users"
          }
        }
      ],
      NH : [
        {
          user : {
            type : Schema.ObjectId,
            ref : "users"
          }
        }
      ],
      RI : [
        {
          user : {
            type : Schema.ObjectId,
            ref : "users"
          }
        }
      ]
      // fallacies : [
      //   {
      //     type : Schema.ObjectId,
      //     ref : "fallacies"
      //   }
      // ]
    }
});

const Statement = mongoose. model('Statement', buildStatementsSchema);
export default Statement;