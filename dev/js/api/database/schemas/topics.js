var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var buildTopicsSchema = new Schema({
    content : String,
    dates_discussed : [
        Date
    ],
    short_id: String
});

const Topic = mongoose.model('Topics', buildTopicsSchema);
export default Topic;