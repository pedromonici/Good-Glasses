'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true,
        index: true,
        unique: true,
    },
    marca: {
        type: String,
        require: true,
        trim: true
    },
    price: {
        type: Number,
        require: true,
    },
    description: {
        type: String,
        trim: true,
    },
    img: {
        type: String,
		require: true
    },
    availableQtt: {
        type: Number,
        require: true,
    },
    category: {
        type: String,
        require: true,
        index: true
    },
    soldQtt: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('Product', schema);
