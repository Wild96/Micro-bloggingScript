var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var User = require("../models/user");
var Token = require("../models/tokenschema");
var Post = require("../models/post");
var randomstring = require("randomstring");
var multer = require('multer');
var path = require('path');
const Port = process.env.Port || 3001;
var fs = require('fs');
var url = 'http://localhost:3001';

var app = express();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/blog")
    .then(() => console.log('Succesfully connected to blog database'))
    .catch((err) => console.error(err));


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.static("public"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }))


const storage = multer.diskStorage({
    destination: './public/uploads',
    filename(req, file, cb) {
        cb(null, `${file.originalname}`);
    },
})
const upload = multer({ storage: storage });


const postimg_storage = multer.diskStorage({
    destination:'./public/postUploads',
    filename(req,file,cb){
        cb(null,`${file.originalname}`);
    },
})
const post_upload = multer({ storage: postimg_storage });

app.post('/', function (req, res) {

    var username = req.body.username;
    var password = req.body.password;
    User.findOne({ username: username } && { password: password }, function (err, result) {
        if (result != null) {
            var token_gen = randomstring.generate();
            console.log("token gernerated for user is :",token_gen);
            var userToken = new Token({
                token: token_gen,
                userData: result
            })
            userToken.save(function (err) {
                if (err) {
                    throw err;
                }
                else {
                    console.log("Authentication successfull and token is generated");
                    res.json({
                        msg: "you have logged in",
                        status: "success",
                        userdata: result,
                        token: token_gen
                    })
                    //      console.log('res.json is sent');
                }
            })
        }
        else {
            console.log("unauthorized user");
        }
    })


})


app.post('/signup', upload.single('files'), function (req, res) {
    console.log("req.body:",req.body);
    var username = req.body.username;
    var password = req.body.password;
    const file = req.file;
    console.log("file ",file);
    const image_path = req.file.path;
    console.log("imagepath:",image_path);
    if (username && password) {
        var newUser = User({
            username: username,
            password: password,
            image_path:image_path
        })
        newUser.save(function (err) {
            if (err) throw err;
            console.log("user created");
        })
        res.send('successfully obained data on server side');
    }
    else {
        res.send('Failure on server side');
    }
})

app.post("/getpic",function(req,res){
    console.log("token from addpost",req.body.token);
    const data = req.body.token;
    Token.findOne({ "token": data }, function (err, result) {
        if (err) throw err;
        console.log("userdeatils fetched by token:",result);
        var name = result.userData.username;
        var img = result.userData.image_path;
        console.log("profile pic :",img);
        console.log("Username",name);
        res.json( {img,name} );  
        console.log("Response sent from getpic route");
    })


})


app.post('/AddPost', post_upload.single('files'), function (req, res) {
    //console.log("req.body:", req.body);
    var data = req.body;
    var title = data.title;
    var postcontent = data.postcontent
    let token_info = data.token_id;
    console.log("token id in the server:",data.token_id);
    const file = req.file;
    console.log("file received :", req.file);
    const img_path = req.file.path;
    

    Token.findOne({ "token": data.token_id }, function (err, result) {
        if (err) throw err;
        var name = result.userData.username;
        var newpost = Post({
            title: title,
            postcontent: postcontent,
            user: name,
            image_path :img_path
        })
        newpost.save(function (err) {
            if (err) throw err;
            console.log("congrats!! your post was saved");
        })
    
    })
    
})

app.post("/home/", function (req, res) {
    //path.join("__dirname"+"../postUploads/xayah hd.jpg");
    try {
        Post.find({}, function (err, data) {
            if (err) throw err;
            // console.log("post data", typeof data);  
            let posts = data.map(d => d);
            //console.log("posts", typeof posts);
            res.json({ posts })

        })
    }
    catch (e) {
        console.log(e);
    }

});
app.get("/singlePost/:id",function(req,res){
    console.log("single post route is called");
    console.log("object id :",req.params);
    var id = req.params.id;
    Post.findOne({"_id":mongoose.mongo.ObjectId(id)}, function (err, data) {
        if(err) throw err;
        console.log(data);
        res.json({ data })
    })
    
})
app.listen(3001, function () {
    console.log('Server is running on port 3001');
})

