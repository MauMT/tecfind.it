const {Schema, model} = require('mongoose');
const mongoose = require('mongoose');

var commentSchema = new Schema({
    //foreign key in RDBMS
    correo: {
        type: String,
        required: true,
        minLength: 3,
        maxlength: 100
    },
    fecha: {
        type: Date,
        required: true
    },
    texto: {
        type: String,
        required: true,
        minLength: 1,
        maxlength: 512
    },
    postId: { type: mongoose.Types.ObjectId, required: true, ref: 'Post' }
})

module.exports = model('Comment', commentSchema);