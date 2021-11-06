const {Schema, model} = require('mongoose');

var commentSchema = new Schema({
    commentID: { 
        type: Number
    },
    //foreign key in RDBMS
    correo: {
        type: String,
        required: true,
        minLength: 3,
        maxlength: 100
    },
    //foreign key in RDBMS 
    postID: { 
        type: Number
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
    }
})

module.exports = model('Comment', commentSchema);