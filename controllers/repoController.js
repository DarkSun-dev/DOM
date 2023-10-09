const Estudante = require('../models/estudanteModel')
const Inscript = require('../models/inscriptModel')
const myReport = require('../utils/reports/inscriptReport')

exports.getStudents = async (req, res, next) => {
    const doc = await Inscript.find({ curso: req.query.curso, ano: req.query.ano, cv: req.query.cv })
    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    })
    next()
}

exports.getStudent = async (req, res, next) => {
    const doc = await Inscript.find({ referencia: req.query.codigo + req.query.ano })
    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    })
    next()
}

exports.getRegex = async (req, res, next) => {
    const userRegex = new RegExp(req.query.args, 'i')
    const doc = await Estudante.find({ firstName: userRegex })
    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    })
    next()
}

exports.getFormando = async (req, res, next) => {
    const doc = await Estudante.find({ codigoEstudante: req.query.args })
    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    })
    next()
}


exports.getReport = async (req, res, next) => {
    var showM = []
    for (let index = 0; index < req.body.inscript_data.modulos.length; index++) {
        showM.push([{ text: `Codigo: ${req.body.inscript_data.modulos[index].codigo} – Titulo: ${req.body.inscript_data.modulos[index].titulo}`, fontSize: 11, margin: [0, 5] }])
    }
    const report = await myReport.inscriptReport(
        req.body.student_data.firstName+" "+req.body.student_data.lastName,
        req.body.student_data.codigoEstudante,
        req.body.student_data.bi,
        req.body.inscript_data.cv,
        req.body.student_data.curso,
        req.body.student_data.telefone,
        req.body.inscript_data.data,
        req.body.student_data.codigoEstudante+""+req.body.inscript_data.ano,
        req.body.inscript_data.ano,
        'INSCRIÇÃO',
        showM
    )

    res.status(201).json({
        status: 'success',
        data: {
            report: report
        }
    })

    next()
}

