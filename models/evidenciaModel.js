const mongoose = require('mongoose')

const evidenciaSchema = new mongoose.Schema({
    codigoEstudante: {
        type: String,
        trim: true,
        required: true
    },
    codigoModulo: {
        type: String,
        trim: true,
        required: true
    },
    referencia: {
        type: String,
        trim: true,
        required: [true, 'Evidência já registada'],
        unique: true,
        lowercase: true,
    },
    tipo_de_evidencia: {
        type: String,
        trim: true,
        required: true
    },
    resultado_de_aprendizagem: {
        type: String,
        trim: true,
        required: true
    },
    classificacao: {
        type: String,
        trim: true,
        required: true
    },
    nota: {
        type: String,
        trim: true,
        required: true
    },
    numero_do_material: {
        type: String,
        trim: true,
        required: true,
        enum: ['1', '2'],
        default: '1'
    },
    material: {
        type: String,
        trim: true,
        required: true
    },
    data_de_realizacao: {
        type: String,
        trim: true,
        required: true
    },
    data_de_lancamento: {
        type: String,
        trim: true,
        required: true
    },
    ano: {
        type: String,
        trim: true,
        required: true
    },
    curso: {
        type: String,
        trim: true,
        required: true
    },
    nivel: {
        type: String,
        trim: true,
        required: true
    },
    tutela: {
        type: Object
    },
    arquivo_pdf: {
        Nome: {
            type: String,
            trim: true,
            required: true
        },
        Tamanho: {
            type: String,
            trim: true,
            required: true
        },
        Tipo: {
            type: String,
            trim: true,
            required: true
        },
        Buffer_PDF: {
            type: Buffer
        }
    }
})

const Evidencia = mongoose.model('Evidencia', evidenciaSchema)

module.exports = Evidencia


