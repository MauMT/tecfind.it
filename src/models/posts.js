const {Schema, model} = require('mongoose');
const mongoose = require('mongoose');

var postSchema = new Schema({
    //foreign key in RDBMS
    correo: {
        type: String,
        required: true,
        minLength: 3,
        maxlength: 100
    }, 
    tag: {
        type: String,
        required: true,
        minLength: 1,
        maxlength: 15
    },
    objectName: {
        type: String,
        required: true,
        minLength: 1,
        maxlength: 50
    },
    lugar: {
        type: String,
        required: true,
        maxlength: 64
    },
    fecha: {
        type: Date,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    comments: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Comment' }]
})

module.exports = model('Post', postSchema);