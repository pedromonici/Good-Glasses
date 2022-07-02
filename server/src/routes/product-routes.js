'use strict'

const express = require('express')
const controller = require('../controllers/product-controller')

const router = express.Router()
router.get('/name/:key', controller.get)
router.get('/category/:key', controller.getByCategory)
router.get('/all', controller.getAll)
router.post('/new/:key', controller.post)
router.post('/update/:key', controller.updatePost)

router.delete('/delete/:key', controller.del)

module.exports = router