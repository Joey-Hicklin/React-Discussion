var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var buildStatementsSchema = new Schema({
    content : String,
    expiration: Date,
    current : Boolean,
    has_edits : Boolean,
    new_edited : {
      type : Schema.ObjectId,
      ref : "statements"
    },
    edit_origin : {
      type : Schema.ObjectId,
      ref : "statements"
    }
});

const Statement = mongoose.model('Statement', buildStatementsSchema);
export default Statement;