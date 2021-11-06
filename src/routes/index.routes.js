const {Router} = require('express');
const router = Router();
//const cookieParser = require("cookie-parser");
const session = require("express-session");

const Users = require('../models/users')
const Comments = require('../models/comments')
const Posts = require('../models/posts');


/* router.get("/", (req,res) => {
    Users.find(function(err, users){
        console.log(users)
    })
    res.json("api works")
}); */

router.get("/post/:id", async(req, res) => {
    const post = await Posts.find({postID: req.params.id})
    res.json(post)
});

router.get("/myposts", async(req,res) => {
    const result = await Posts.find({userID: req.user.id})
    res.json(result)
});

router.post("/signup", (req,res) => {
    
});

router.get("/login", (req,res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});

router.post("/login", (req,res) => {
    
});

router.get("/logout", (req,res) => {
    req.session.destroy((err) => {
        console.log(req.session);
        if (err) {
            console.log(err);
        }
        res.clearCookie("userId");
        res.send("user logged out");
        });
});



router.post("/createpost", async(req,res) => {
    
    const postData = {
    "postID": req.body.postID,
    "correo": req.body.correo,
    "objectName": req.body.objectName,
    "lugar": req.body.lugar,
    "fecha": req.body.fecha,
    "image": req.body.image,
    "tag": req.body.tag
    }  
    const post = new Posts(postData);
    await post.save();
    res.json({status: "Post saved"});

    
});

router.delete("/post", (req,res) => {
    res.send(`Post ${req.params.id}`);
});

router.post("/createcomment", async(req,res) => {
    
    const commentData = {
        "commentID": req.body.commentID,
        "correo": req.body.correo,
        "postID": req.body.postID,
        "fecha": req.body.fecha,
        "texto": req.body.texto,

        }  
        const comment = new Comments(commentData);
        await comment.save();
        res.json({status: "Post saved"});

});

router.put("/post/status", (req,res) => {
    const newStatus = req.body.tag;
    const postID = req.body.postID;
    Posts.findByIdAndUpdate({postID, newStatus}, (err, post) => {
        if (err) {
            console.log(err);
        }
        res.json({status: "Post updated"});
    });
});

module.exports = router; 