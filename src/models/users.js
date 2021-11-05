const {Schema, model} = require('mongoose');

var usuarioSchema = new Schema({
    correo: {
        type: String,
        required: true,
        minLength: 3,
        maxlength: 100
    }, 
    nombreUsuario: {
        type: String,
        required: true,
        minLength: 1,
        maxlength: 32
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxlength: 128
    }
})

var commentSchema = new Schema({
    commentID: { 
        type: Number,
        required: true
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
        type: Number,
        required: true
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

module.exports = model('Usuario', usuarioSchema);
