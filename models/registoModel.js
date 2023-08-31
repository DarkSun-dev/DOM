const mongoose = require('mongoose');

const registoSchema = new mongoose.Schema(
    {
        formador: {
            type: String,
            required: [true, 'Numero de BI invalido!']
        },
        modulos: Array,
        data: String
    }
)

const Registo = mongoose.model('Registo', registoSchema)

module.exports = Registo

