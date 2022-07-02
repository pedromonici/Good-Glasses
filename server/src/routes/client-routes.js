'use strict'

const express = require('express')
const controller = require('../controllers/client-controller')

const router = express.Router()
router.get('/login/:key', controller.get)
router.get('/all_users', controller.getAll)
router.post('/signup/:key', controller.post)
router.post('/update_info/:key', controller.updatePost)

module.exports = router