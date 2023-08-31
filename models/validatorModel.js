const mongoose = require('mongoose');
const validatorSchema = new mongoose.Schema(
    {
        codigo: {
            type: String,
            unique: true
        },
        formador: {
            type: String
        }
    }
)

const Validator = mongoose.model('Validator', validatorSchema)

module.exports = Validator

