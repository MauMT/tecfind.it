const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Comment = require('../models/comments');
const Post = require('../models/posts');
const { off } = require('../models/comments');

const createComment = async(req, res, next) => {
    console.log(req);
    const {email, date, text, postId} = req.body;

    const createdComment = new Comment({
        correo: email,
        fecha: date,
        texto: text,
        postId
    });

    //Obtener el Post al que se le hace el comentario
    let post;
    console.log(postId);
    try {
        post = await Post.findById(postId);
    } catch (error) {
        return next(
            new HttpError('Error fetching post', 500)
        );
    }

    if(!post){
        return next(
            new HttpError('Could not find post with given Id', 404)
        );
    }

    //Deberiamos usar transaccion
    try {
        await createdComment.save();
        post.comments.push(createdComment);
        await post.save();
    } catch (error) {
        console.log(error);
        return next(
            new HttpError('Creating comment failed', 500)
        );
    }

    res.status(201).json({ comment: createdComment});
}

const getPostComments = async(req, res, next) => {
    const postId = req.body.postId;

    let postWithComments;
    try {
        postWithComments = await Post.findById(postId).populate('comments');
    } catch (error) {
        return next(
            new HttpError('Error fetching post', 500)
        );
    }

    if(!postWithComments || postWithComments.comments.length === 0){
        return next(
            new HttpError('No comments or bad id', 404)
        );
    }
    res.status(200).json({
        comments: postWithComments.comments.map(comment =>
          comment.toObject({ getters: true })
        )
      });

}

module.exports = {
    createComment: createComment,
    getPostComments: getPostComments
}