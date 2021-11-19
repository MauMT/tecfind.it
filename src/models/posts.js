const {Schema, model} = require('mongoose');

var postSchema = new Schema({
    //foreign key in RDBMS
    correo: {
        type: String,
        required: true,
        minLength: 3,
        maxlength: 100,
        default: 'test@testing.com'
    }, 
    tag: {
        type: String,
        required: true,
        minLength: 3,
        maxlength: 15,
        default: 'Open'
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
        minLength: 1,
        maxlength: 128
    }
})

module.exports = model('Post', postSchema);