const {Router} = require('express');
const router = Router();
//const cookieParser = require("cookie-parser");
const session = require("express-session");
const ObjectId = require('mongoose').Types.ObjectId; 
const { check } = require('express-validator');


const Comments = require('../models/comments')
const Posts = require('../models/posts');


const UserController = require('../controllers/UserController');



router.get("/", (req,res) => {
    res.render(__dirname + "/../views/home.ejs");
});

router.get("/login-signup", (req, res) =>{
    res.render(__dirname + "/../views/login.ejs");
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

router.post("/api/signup",
    [
        check('userName', 'El nombre de usuario es requerido').not().isEmpty(),
        check('email', 'Un correo es requerido').normalizeEmail().isEmail(),
        check('password', 'Una contraseña de seis digitos es requerida').isLength({min: 6})
    ],
    UserController.signUp
);

router.post("/api/login",
    [
        check('email', 'Un correo registrado es requerido').normalizeEmail().isEmail(),
        check('password', 'El campo contraseña es requerido').not().isEmpty()
    ],
    UserController.login
)





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
    res.json({status: "Post saved"});

    
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