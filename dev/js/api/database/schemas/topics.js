var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var buildTopicsSchema = new Schema({
    topic : String,
    dates_discussed : [
        Date
    ]
});

const Topic = mongoose. model('Topics', buildTopicsSchema);
export default Topic;