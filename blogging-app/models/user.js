var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    username: String,
    password: String,
    image_path: String
});

 var User = mongoose.model('user', userSchema);
module.exports =  User ;