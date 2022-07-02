'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async (req, res, next) => {
    const key = req.params.key
    console.log(`get done - ${key}: ${JSON.stringify(req.body)}`)

    try {
        const product = await Product.findOne({name: key});
        console.log("got product: ", product);
        res.status(200).send(product)
    } catch (error) {
        console.log("error: ", error);
        res.status(404).send("Could not find requested product") 
    }
}

exports.getByCategory = async (req, res, next) => {
    console.log(`get done for products by category: `, req.params)

    try {
        let categoryFilter = req.params.key === "null"? {} : {category: req.params.key};
        let products = await Product.find(categoryFilter);
        products = products.reduce((productsObj, product) => {
            productsObj[product.name] = product;
            return productsObj;
        }, {});
        console.log("products by category: ", products);
        res.status(200).send(products)
    } catch (error) {
        console.log("error: ", error);
        res.status(404).send("Could not get all products") 
    }
}

exports.getAll = async (req, res, next) => {
    console.log(`get done for all products`)

    try {
        const products = (await Product.find()).reduce((productsObj, product) => {
            productsObj[product.name] = product;
            return productsObj;
        }, {});
        console.log("all products: ", products);
        res.status(200).send(products)
    } catch (error) {
        console.log("error: ", error);
        res.status(404).send("Could not get all products") 
    }
}

exports.post = async (req, res, next) => {
    console.log("Post done for product", req.body.name);
    const product = new Product(req.body)
    try {
        let saved = await product.save();
        res.status(200).send({
            message: 'Product created sucessfully'
        })    
    } catch (error) {
        res.status(500).send({
            message: 'Failure on registering product'
        })
    
    }
}

exports.updatePost = async (req, res, next) => {
    const key = req.params.key
    console.log(`updating - ${key}: ${JSON.stringify(req.body)}`)

    try {
        const product = await Product.findOneAndUpdate({name: key}, req.body);
        console.log("updated product: ", product);
        res.status(200).send({
            message: 'Product updated sucessfully'
        })    
    } catch (error) {
        console.log(error);
        res.status(401).send({
            message: 'Failure on updating product'
        })
    
    }
}

exports.del = async (req, res, next) => {
    const key = req.params.key
    console.log(`delete done - ${key}: ${JSON.stringify(req.body)}`)

    try {
        const product = await Product.findOneAndRemove({name: key});
        console.log("product: ", product);
        res.status(200).send({
            message: 'Product removed sucessfully'
        })    
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Failure on removing product'
        })
    
    }
}