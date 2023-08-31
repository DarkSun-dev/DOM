const Formador = require('../models/formadorModel')
const Registo = require('../models/registoModel')
const User = require('../models/userModel')
const Validator = require('../models/validatorModel')
const AppError = require('../utils/appError');
const factory = require('./handlerFactory')
exports.registarFormador = factory.createOne(Formador)
exports.getFormadors = factory.getAll(Formador)

exports.deleteFormador = async (req, res, next) => {
    const deep = await Formador.findOne({email: req.params.email })
    const dc = await Formador.deleteOne({ bi: deep.bi })
    const dcb = await User.deleteOne({ email: deep.email })
    const doc = await Registo.deleteMany({ formador: deep.bi })
    const docb = await Validator.deleteMany({ formador: deep.bi })
    if (!deep) {
        return next(new AppError('No document found with that ID', 404));
    }
    res.json({
        result: {
            doc: deep
        }
    })
}