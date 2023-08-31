const mongoose = require('mongoose');
const validator = require('validator')
   
//const ano = new Date().getFullYear()
const inscriptSchema = new mongoose.Schema({
    codigoEstudante: {
        type: String,
        trim: true,
        uppercase: true,
        required: true
    },
    referencia: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        required: true
    },
    cv: {
        type: String,
        trim: true,
        required: true
    },
    curso: {
        type: String,
        trim: true,
        required: true
    },
    ano: {
        type: String,
        trim: true,
        required: true
    },
    data:{
        type: String,
        trim: true,
    },
    modulos: Array
}, {timestamps: true})


const Inscript = mongoose.model('Inscript', inscriptSchema)

module.exports = Inscript