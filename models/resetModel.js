
const mongoose = require('mongoose');

const resetPasswordSchema = new mongoose.Schema(
    {
        email: {
            type: String
        },
        message: {
            type: String
        }, 
        senha: {
            type: String
        }, 
        url: {
            type: String
        },
        data: String
    }
)

const ResetPassword = mongoose.model('ResetPassword', resetPasswordSchema)

module.exports = ResetPassword