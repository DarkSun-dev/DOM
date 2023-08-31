//Modeling Estudante
const mongoose = require('mongoose');
const validator = require('validator')

const estudanteSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'O estudante deve ter um nome proprio'],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, 'O estudante deve ter um apelido'],
            trim: true,
        },
        dateBirth: {
            type: String,
            trim: true,
            required: true
        },
        local_nascimento: {
            type: String,
            trim: true,
            required: true
        },
        genero: {
            type: String,
            trim: true,
            required: true
        },
        bi: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            uppercase: true,
            minlength: [13, 'Um numero de BI deve conter 13 caracteres'],
            maxlength: [13, 'Um numero de BI deve conter 13 caracteres']
        },
        codigoEstudante: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            uppercase: true
        },
        dateEmiBI: {
            type: String,
            trim: true,
            required: true
        },
        local_emissao: {
            type: String,
            trim: true,
            required: true
        },
        curso: {
            type: String,
            trim: true,
            required: true
        },
        nation: {
            type: String,
            trim: true,
            required: true
        },
        province: {
            type: String,
            trim: true,
            required: true
        },
        address: {
            type: String,
            trim: true,
            required: true
        },
        telefone: {
            type: Number,
            maxlength: 9,
            required: [true, 'Please tell us your number!']
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email']
        },
        estado: {
            type: String,
            enum: ['frequentando', 'parado'],
            default: 'frequentando'
        },
        ingresso: {
            type: String,
            trim: true
        }

    }, {timestamps: true}
)

const Estudante = mongoose.model('Estudante', estudanteSchema)

module.exports = Estudante