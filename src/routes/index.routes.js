const {Router} = require('express');
const router = Router();
//const cookieParser = require("cookie-parser");
const session = require("express-session");
const ObjectId = require('mongoose').Types.ObjectId; 
const { check } = require('express-validator');
const fs = require('fs'); //para borrar después

const CommentController = require('../controllers/CommentController');
const UserController = require('../controllers/UserController');
const PostController = require('../controllers/PostController');
const fileUpload = require('../middleware/file-upload');


//USER
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

//POSTS
router.post("/api/createpost",
    fileUpload.single('image'),
    PostController.createPost);

router.get("/api/posts/feed", PostController.getAllPosts);
router.post("/api/posts/user", PostController.getPostsByUserId);




//COMMENTS
router.post("/api/comment/create", CommentController.createComment);
router.post("/api/post/comments", CommentController.getPostComments);

router.delete("/api/post/delete", (req,res) => {
    res.send(`Post ${req.params.id}`);
});
module.exports = router; 