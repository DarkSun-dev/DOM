const Modulo = require('../models/moduloModel')
const Validator = require('../models/validatorModel')
const factory = require('./handlerFactory')

exports.registarModulo = async (req, res, next) => {
  try {
      const doc = await Modulo.create(req.body);
      res.status(201).json({
          status: 'success',
          data: {
              data: doc
          }
      })
  } catch (error) {
      if (error.name === "ValidationError") {
          return res.send({ status: 'error', log: error })
      }
      res.send(error)
  }
  next()
}

exports.getModulos = factory.getAll(Modulo)
exports.getModulo = async (req, res, next) => {
  const doc = await Modulo.find({ curso: req.query.curso, nivel: req.query.nivel })
  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  })
  next()
}

exports.createValidate = async (req, res, next) => {
  const doc = await Validator.insertMany(req.body)
  res.status(201).json({
    status: 'success',
    data: {
      data: doc
    }
  })
  next()
}

exports.getCodes = factory.getAll(Validator)

exports.setValidate = async (req, res, next) => {
  const doc = await Validator.findOne({ codigo: req.query.codigo })
  if(doc == null){
    res.json({
      status: 'success',
      result: false
    })
  }else{
    res.json({
      status: 'success',
      result: true
    })
  }
  next()
}