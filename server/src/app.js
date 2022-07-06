'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv/config')

const app = express()
const router = express.Router()

// Connect to the database
mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }, err => {
        console.log('connected')
    });

// Load database models
const Client = require('./models/client');
const Product = require('./models/product');

// Load the routes
const clientRoutes = require('./routes/client-routes')
const productRoutes = require('./routes/product-routes')

// Configure bodyParser
app.use(bodyParser.json({
    limit: '5mb'
}))
app.use(bodyParser.urlencoded({extended: false}))

// Enable CORS
app.use(cors())

app.use(express.static('public'))
app.use('/', clientRoutes)
app.use('/product', productRoutes)

module.exports = app