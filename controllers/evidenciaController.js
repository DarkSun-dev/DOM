const Evidencia = require('../models/evidenciaModel')
const factory = require('./handlerFactory')
const myReport = require('../utils/reports/resultReport')
const doc = require('pdfkit')

exports.criarEvidencia = async (req, res, next) => {
    try {
        if (req.body.material === "Avaliação") {
            const doc = await Evidencia.create(req.body)
            res.status(201).json({
                status: 'success',
                data: {
                    data: doc
                }
            })
        }

        if (req.body.material === "Reavaliação" && req.body.numero_do_material === '1') {
            const result = await Evidencia.findOne({
                material: 'Avaliação',
                resultado_de_aprendizagem: req.body.resultado_de_aprendizagem,
            })

            if (!result) {
                res.json({
                    status: 'exception',
                    log: 'Esta evidencia não pode ser lancada. A Avaliação deste resultado de aprendizagem ainda não foi lancada.'
                })
            } else {
                console.log('Can create this evidenc: ' + req.body.material + ' ' + req.body.numero_do_material)
                const doc = await Evidencia.create(req.body)
                res.status(201).json({
                    status: 'success',
                    data: {
                        data: doc
                    }
                })
            }
        }

        if (req.body.material === "Reavaliação" && req.body.numero_do_material === '2') {
            const result = await Evidencia.findOne({
                material: 'Reavaliação',
                resultado_de_aprendizagem: req.body.resultado_de_aprendizagem,
                numero_do_material: '1'
            })

            if (!result) {
                res.json({
                    status: 'exception',
                    log: 'Esta evidencia não pode ser lancada. A 1º Reavaliação deste resultado de aprendizagem ainda não foi lancada.'
                })
            } else {
                console.log('Can create this evidenc: ' + req.body.material + ' ' + req.body.numero_do_material)
                const doc = await Evidencia.create(req.body)
                res.status(201).json({
                    status: 'success',
                    data: {
                        data: doc
                    }
                })
            }
        }

    } catch (error) {
        if (error.name === "ValidationError") {
            return res.send({ status: 'error', log: error })
        }
        res.send(error)
    }

    next()
}

exports.getEvidencia = async (req, res, next) => {
    const doc = await Evidencia.find({ codigoEstudante: req.query.estudante, codigoModulo: req.query.modulo, ano: req.query.ano })
    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    })
    next()
}

exports.getRI = async (req, res, next) => {
    var doc = []
    var input = req.body.evidencia
    const group = input.reduce((acc, item) => {
        if (!acc[item.resultado_de_aprendizagem]) {
            acc[item.resultado_de_aprendizagem] = [];
        }

        acc[item.resultado_de_aprendizagem].push(item);
        return acc;
    }, {})


    for (var key in group) {
        doc.push({ ra: group[key] })
    }

    var shoot = []
    for (let n = 0; n < doc.length; n++) {
        var line = {}
        for (let k = 0; k < doc[n].ra.length; k++) {

            Object.assign(line, { ra: doc[n].ra[k].resultado_de_aprendizagem })

            if (doc[n].ra[k].material === 'Avaliação') {
                Object.assign(line, {
                    av_nota: doc[n].ra[k].nota,
                    dr: doc[n].ra[k].data_de_realizacao
                })
            }

            if (doc[n].ra[k].material === 'Reavaliação' && doc[n].ra[k].numero_do_material === '1') {
                Object.assign(line, {
                    reavA_nota: doc[n].ra[k].nota,
                    drA: doc[n].ra[k].data_de_realizacao
                })
            }

            if (doc[n].ra[k].material === 'Reavaliação' && doc[n].ra[k].numero_do_material === '2') {
                Object.assign(line, {
                    reavB_nota: doc[n].ra[k].nota,
                    drB: doc[n].ra[k].data_de_realizacao
                })
            }
        }
        shoot.push(line)
    }


    var ras = []
    for (let p = 0; p < shoot.length; p++) {
        ras.push({
            table: {
                widths: ['*', '*', '*', '*', '*'],
                body: [
                    [
                        { text: `${shoot[p].ra.charAt(0)}`, italics: true, color: 'gray' },
                        { text: `${shoot[p].av_nota === undefined ? '' : shoot[p].av_nota+'%'}`, italics: true, color: 'gray' },
                        { text: `${shoot[p].dr === undefined ? '' : shoot[p].dr}`, italics: true, color: 'gray' },
                        { text: `${shoot[p].reavA_nota === undefined ? '' : shoot[p].reavA_nota+'%'} - ${shoot[p].drA === undefined ? '' : shoot[p].drA}`, italics: true, color: 'gray' },
                        { text: `${shoot[p].reavB_nota === undefined ? '' : shoot[p].reavB_nota+'%'} - ${shoot[p].drB === undefined ? '' : shoot[p].drB }`, italics: true, color: 'gray' }],
                ]
            }
        })
    }

    const file = await myReport.riReport(req.body.estudante, req.body.modulo, ras)
    res.status(200).json({
        status: 'success',
        data: {
            data: file
        }
    })
    next()
}
