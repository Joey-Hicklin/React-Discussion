var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var buildNamesSchema = new Schema({
  name : String,
  place : Number
});

const Name = mongoose.model('Name', buildNamesSchema);
export default Name;