'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'User must have a password'],
        trim: true,
    },
    cpf: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },
    address: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    }
})

module.exports = mongoose.model('Client', schema);