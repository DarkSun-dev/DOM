const express = require('express')
const formadorController = require('./../controllers/formadorController')
const registoController = require('./../controllers/registoController')
const authController = require('./../controllers/authController')
const router = express.Router()
router.post('/register', formadorController.registarFormador)
router.get('/mymoduls', registoController.getMymoduls)
router.use(authController.protect)
router.get('/eliminarRegisto', registoController.deleteReg)
router.get('/obterRegisto', registoController.getRegisto)
router.get('/obterRegistos', registoController.getRegistos)
router.post('/criarRegisto', registoController.criarRegisto)
router.use(authController.restrictTo('admin'))
router.delete('/:email', formadorController.deleteFormador)
router.get('/get', formadorController.getFormadors)
module.exports = router