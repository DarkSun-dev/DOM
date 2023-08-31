const mongoose = require('mongoose');
const validator = require('validator')

const formadorSchema = new mongoose.Schema(
    {
        nome_completo: {
            type: String,
            required: [true, 'Nome!']
        },
        bi: {
            type: String,
            unique: true,
            required: [true, 'Numero de BI invalido!']
        },
        email: {
            type: String,
            required: [true, 'Please provide your email'],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email']
        },
        contacto: {
            type: String,
            required: [true, 'Numero de telefone!']
        },
        data: String,
    }
)

const Formador = mongoose.model('Formador', formadorSchema)

module.exports = Formador

