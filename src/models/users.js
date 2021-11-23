const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
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
        maxlength: 64
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxlength: 128
    }
})

module.exports = mongoose.model('Usuario', usuarioSchema);
