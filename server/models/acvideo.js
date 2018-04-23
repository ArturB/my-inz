var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = new Schema({
    videoName: {type: String, required: true},	
	videoDate: {type: String, required: true},
	videoPath: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

//a method which will get executed whenever sth happens to a acVideo
//.post => do it after a certain action happended, 1t arg in a string I specify which action I want to listen => remove action 
schema.post('remove', function(acVideo) {
	User.findById(acVideo.user, function(err, user) {
		user.acVideos.pull(acVideo); //pull an acVideo from the user.acVideos array
		user.save(); //update the user array
	});
});

module.exports = mongoose.model('AcVideo', schema);

