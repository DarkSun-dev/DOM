const express = require('express')
const repoController = require('./../controllers/repoController')
const authController = require('./../controllers/authController')
const router = express.Router()


router.use(authController.protect)
router.get('/getstudentlist', repoController.getStudents)
router.get('/inscriptedstudent', repoController.getStudent)
router.get('/getStudentRegex', repoController.getRegex)
router.get('/getFormando', repoController.getFormando)
router.post('/getInscriptReport', repoController.getReport)

module.exports = router