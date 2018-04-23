var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    videoName: {type: String, required: true},	
	videoDate: {type: String, required: true},
	videoPath: {type: String, required: true}
});

module.exports = mongoose.model('Video', schema);