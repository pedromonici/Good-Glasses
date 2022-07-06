'use strict'

const express = require('express')
const controller = require('../controllers/product-controller')
const authService = require('../services/auth-service')

const router = express.Router()

// Regular endpoints
router.get('/name/:name', controller.get)
router.get('/category/:category', controller.getByCategory)
router.get('/all', controller.getAll)
router.post('/order/:name', authService.authorize, controller.orderPost)

// Admin endpoints
router.post('/new/:name', authService.isAdmin, controller.post)
router.post('/update/:name', authService.isAdmin, controller.updatePost)
router.delete('/delete/:name', authService.isAdmin, controller.del)

module.exports = router