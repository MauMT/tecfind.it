const fs = require('fs');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Post = require('../models/posts');

const createPost = async(req, res, next) => {
    const {tag, objectName, lugar, fecha, correo} = req.body;

    const createdPost = new Post({
        tag,
        correo,
        objectName,
        lugar,
        fecha,
        image: req.file.path
    })

    //en teoria checar que el correo si es valido y tener un pointer
    try {
        await createdPost.save();
    } catch (error) {
        return next(
            new HttpError('Creating post failed!', 500)
        );
    }

    res.status(201).json({post: createdPost});
}

module.exports = {
    createPost: createPost
}