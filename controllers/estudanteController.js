const Estudante = require('../models/estudanteModel')
const Inscript = require('../models/inscriptModel')
const catchAsync = require('../utils/catchAsync');
const myReport = require('../utils/reports/inscriptReport')
const Caderneta = require('../utils/reports/caderneta')
const factory = require('./handlerFactory')


exports.inscreverEstudante = async (req, res, next) => {
    var showM = []
    const doc = await Inscript.create(req.body.inscript_data)
    for (let index = 0; index < req.body.inscript_data.modulos.length; index++) {
        showM.push([{ text: `Codigo: ${req.body.inscript_data.modulos[index].codigo} – Titulo: ${req.body.inscript_data.modulos[index].titulo}`, fontSize: 11, margin: [0, 5] }])
    }
    const report = await myReport.inscriptReport(
        req.body.student_data.nome,
        req.body.student_data.codigoEstudante,
        req.body.student_data.bi,
        req.body.student_data.cv,
        req.body.student_data.curso,
        req.body.student_data.telefone,
        req.body.student_data.data,
        req.body.inscript_data.referencia,
        req.body.inscript_data.ano,
        'INSCRIÇÃO',
        showM
    )

    res.status(201).json({
        status: 'success',
        data: {
            data: doc,
            report: report
        }
    });
}

exports.setValid = async (req, res, next) => {
    const doc = await Inscript.findOne({ referencia: req.params.id })
    console.log(doc)
    if (!doc) {
        res.send({ exist: false, message: 'no doc found' })
    } else {
        res.send({ exist: true, message: 'doc founded' })
    }
    next()
}

exports.getStudent = catchAsync(async (req, res, next) => {

    const doc = await Estudante.findOne({ codigoEstudante: req.query.codigo })
    const mds = await Inscript.findOne({ referencia: req.query.codigo + req.query.ano })

    res.status(200).json({
        status: 'success',
        data: {
            data: doc,
            unidades: mds
        }
    })

})

exports.getStudents = async (req, res, next) => {
    const doc = await Estudante.find()
    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    })
    next()
}
exports.cadastrarEstudante = async (req, res, next) => {
    try {
        const doc = await Estudante.create(req.body);
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

exports.getList = async (req, res, next) => {
    var result = []
    var package = []
    const doc = await Inscript.find({ ano: req.query.ano })
    if (doc.length == 0 || doc === null || doc === undefined) {
        res.json({ data: [] })
    } else {
        for (let index = 0; index < doc.length; index++) {
            doc[index].modulos.map(function (el) {
                if (el.codigo === `${req.query.codigo}`) {
                    result.push(doc[index].codigoEstudante);
                }
            })
        }

        for (let i = 0; i < result.length; i++) {
            var student = await Estudante.findOne({ codigoEstudante: result[i] })
            package.push(student)
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: package
            }
        })
    }
    next()
}

exports.Caderneta = async (req, res, next) => {
    try {
        const file = await Caderneta.caderneta(req.body)
        res.json({ doc: file })
    } catch (error) {
        console.log(error)
    }
    next()
}

exports.updateStudent = factory.updateOne(Estudante)
