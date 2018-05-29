var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var postSchema = new Schema({
    title : String,
    postcontent : String,
    user : String,
    image_path:String
    /*
    createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
    */
});

 var Post = mongoose.model('Post', postSchema);
module.exports =  Post ;