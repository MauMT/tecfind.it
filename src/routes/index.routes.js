const {Router} = require('express');
const router = Router();
//const cookieParser = require("cookie-parser");
const session = require("express-session");
const ObjectId = require('mongoose').Types.ObjectId; 

const Users = require('../models/users')
const Comments = require('../models/comments')
const Posts = require('../models/posts');



router.get("/", (req,res) => {
    res.render(__dirname + "/../views/home.ejs");
});

router.get("/api/post/:id", async(req, res) => {
    const post = await Posts.find({_id: new ObjectId(req.params.id)}).catch(err => {
        console.log(err);
    });
    res.json(post) //cambiar a render de post
});

router.get("/api/myposts", async(req,res) => {
    const result = await Posts.find({userID: req.user.id})
    res.json(result)
});

router.post("/api/signup", async(req,res) => {
    const userData = {
        "correo": req.body.correo,
        "nombreUsuario": req.body.nombreUsuario,
        "password": req.body.password
        }  
        const user = new Users(userData);
        await user.save()
        .then(user => {
            res.json(user) //redirect to my posts
        })
        .catch(err => { //if the user already exists show error and the user the form again
            res.status(400).send("unable to save to database");
        });
       
});

router.get("/api/login", (req,res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});

router.post("/api/login", (req,res) => {
    
});

router.get("/api/logout", (req,res) => {
    /* req.session.destroy((err) => {
        console.log(req.session);
        if (err) {
            console.log(err);
        }
        res.clearCookie("userId");
        res.send("user logged out");
        }); */
});

router.get("/api/createpost", async(req,res) => {
    res.render(__dirname + "/../views/createpost.ejs");
})

router.post("/api/createpost", async(req,res) => {
    
    const postData = {
    "correo": req.body.correo,
    "objectName": req.body.objectName,
    "lugar": req.body.lugar,
    "fecha": req.body.fecha,
    "image": req.body.image,
    "tag": req.body.tag
    }  
    const post = new Posts(postData);
    await post.save();
    res.render(__dirname + "/../views/home.ejs");

});

router.delete("/api/post", (req,res) => {
    res.send(`Post ${req.params.id}`);
});

router.post("/api/createcomment", async(req,res) => {
    
    const commentData = {
        "correo": req.body.correo,
        "postID": req.body.postID,
        "fecha": req.body.fecha,
        "texto": req.body.texto,

        }  
        const comment = new Comments(commentData);
        await comment.save();
        res.json({status: "Post saved"});

});
//checar si usar get, put o post y quizá cambiar ruta para modificar el status de un post
router.get("/api/post/status", (req,res) => {
    const newStatus = req.body.tag;
    const postID = req.params.postID;
    Posts.findByIdAndUpdate({postID, newStatus}, (err, post) => {
        if (err) {
            console.log(err);
        }
        res.json({status: "Post updated"});
    });
});

module.exports = router; 