const mongoose = require('mongoose');
const validator = require('validator')

const moduloSchema = new mongoose.Schema({
    codigo: {
        type: String,
        trim: true,
        unique: true,
        uppercase: true,
        required: true
    },
    titulo: {
        type: String,
        trim: true,
        required: true
    },
    descri: {
        type: String,
        trim: true,
        required: true
    },
    nivel: {
        type: String,
        trim: true,
        required: true
    },
    area: {
        type: String,
        trim: true,
        required: true
    },
    sub_area: {
        type: String,
        trim: true,
        required: true
    },
    curso: {
        type: String,
        trim: true,
        required: true
    },
    creditos:{
        type: String,
        trim: true,
    },
    data_de_registo: {
        type: String,
        trim: true,
    },
    data_de_registo_revisao: {
        type: String,
        trim: true,
    },
    elementos_de_competencia: [
        {
            RA_numero: {
                type: Number,
                trim: true,
                required: true
            },
            resultado_de_aprendizagem: {
                type: String,
                trim: true,
                required: true
            },
        }
    ],
}, {timestamps: true})


const Modulo = mongoose.model('Modulo', moduloSchema)

module.exports = Modulo