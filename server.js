const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/commentData', { useNewUrlParser: true }).then(function (){
    console.log("成功");
}).catch(function (error){
    console.log("失败" + error);
});

const commentSchma = new mongoose.Schema({
    belong: String,
    content: String
});
const Comment = mongoose.model('Comment', commentSchma);

const likeSchma = new mongoose.Schema({
    belong: String,
    val: String
});
const Like = mongoose.model('Like', likeSchma);


const app = express();
app.engine('art', require('express-art-template'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, "mainpage")));

app.get('/document/:id', async function (req, res){
    const input = req.query;
    if(Object.keys(input).length == 0){
        let comment1 = 0;
        await Comment.find({belong : req.params.id}).then(function (result){
            comment1 = result;
        });
        let numLike = 0;
        await Like.findOne({belong : req.params.id}).then(function (result){
            numLike = parseInt(result.val);
        });
        res.render('' + req.params.id, {
            target : comment1,
            Likenumber : '' + numLike
        });
    }else if(Object.keys(input).length == 1){
        const text = input.comment;
        const comment = new Comment({
            belong: req.params.id,
            content: text
        });
        await Comment.find({belong : req.params.id, content : text}).then(async function (result){
            if(result.length == 0){
                await comment.save();
            }
        });
        
        let comment1 = [];
        await Comment.find({belong : req.params.id}).then(function (result){
            comment1 = result;
        });
        let numLike = 0;
        await Like.findOne({belong : req.params.id}).then(function (result){
            numLike = parseInt(result.val);
        });
        res.render('' + req.params.id, {
            target : comment1,
            Likenumber : '' + numLike
        });
    }else if(Object.keys(input).length == 2){
        const vval = parseInt(input.val);
        await Like.findOne({belong : req.params.id}).then(async function (result){
            await Like.updateOne({_id: result._id}, {val: (parseInt(result.val) + vval) + ''});
        });
    }
});


app.get("/browsestory", async function(req, res){
    await Like.find().then(async function (result){
        res.render("browsestory", {
            likeDC1: result[0].val,
            likeDC2: result[1].val,
            likeDC3: result[2].val,
            likeDC4: result[3].val
        });
    });
});
app.listen(3000);