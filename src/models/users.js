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

module.exports = model('Usuario', usuarioSchema);
