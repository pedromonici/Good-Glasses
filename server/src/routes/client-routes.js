'use strict'

const express = require('express')
const controller = require('../controllers/client-controller')
const authService = require('../services/auth-service')

const router = express.Router()
// Client endpoints
router.post('/authenticate', controller.authenticate)
router.get('/login/:cpf', authService.authorize, controller.get)
router.post('/refresh_token', authService.authorize, controller.refreshToken)
router.post('/signup/:cpf', controller.post)
router.post('/update_info/:cpf', authService.authorize, controller.updatePost)

// Admin endpoints
router.get('/all_users', authService.isAdmin, controller.getAll)


module.exports = router