const express = require('express')
const evidenciaController = require('./../controllers/evidenciaController')
const authController = require('./../controllers/authController')
const router = express.Router()
router.use(authController.protect)
router.get('/getEvidencias', evidenciaController.getEvidencia)
router.post('/getRI', evidenciaController.getRI)
router.post('/create', evidenciaController.criarEvidencia)
module.exports = router
