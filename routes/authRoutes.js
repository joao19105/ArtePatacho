const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthController')

router.get('/register', AuthController.register)
router.post('/registerPost', AuthController.registerPost)
router.get('/login', AuthController.login)
router.post('/loginPost', AuthController.loginPost)
router.get('/logout', AuthController.logout)

module.exports = router