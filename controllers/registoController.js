const Registo = require('../models/registoModel')
const Formador = require('../models/formadorModel')
const Validator = require('../models/validatorModel')
const AppError = require('../utils/appError')
const factory = require('./handlerFactory')
exports.criarRegisto = factory.createOne(Registo)
exports.getRegistos = factory.getAll(Registo)
exports.getRegisto = async (req, res, next) => {
    const doc = await Registo.find({ formador: req.query.formador })
    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    })
    next()
}
exports.getMymoduls = async (req, res, next) => {
    const deep = await Formador.findOne({email: req.query.email })
    if (!deep) {
        return next(new AppError('No document found with that ID', 404));
    }
    const doc = await Registo.find({ formador: deep.bi })
    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    })
    next()
}
exports.deleteReg = async (req, res, next) => {
    //console.log(req.query.formador)
    const doc = await Registo.deleteMany({formador: req.query.formador})
    const docb = await Validator.deleteMany({formador: req.query.formador})
    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }
    if (!docb) {
        return next(new AppError('No document found with that ID', 404));
    }
    res.json({result: {
        doc: doc,
        docb: docb
    }})
}