'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async (req, res, next) => {
    // console.log(`get done - ${req.params.name}: ${JSON.stringify(req.body)}`)

    try {
        const product = await Product.findOne({name: req.params.name});
        // console.log("got product: ", product);
        res.status(200).send(product)
    } catch (error) {
        console.log("error: ", error);
        res.status(404).send("Could not find requested product") 
    }
}

exports.getByCategory = async (req, res, next) => {
    // console.log(`get done for products by category: `, req.params)

    try {
        let categoryFilter = req.params.category === "null"? {} : {category: req.params.key};
        let products = await Product.find(categoryFilter);
        products = products.reduce((productsObj, product) => {
            productsObj[product.name] = product;
            return productsObj;
        }, {});
        // console.log("products by category: ", products);
        res.status(200).send(products)
    } catch (error) {
        console.log("error: ", error);
        res.status(404).send("Could not get all products") 
    }
}

exports.getAll = async (req, res, next) => {
    // console.log(`get done for all products`)

    try {
        const products = (await Product.find()).reduce((productsObj, product) => {
            productsObj[product.name] = product;
            return productsObj;
        }, {});
        // console.log("all products: ", products);
        res.status(200).send(products)
    } catch (error) {
        console.log("error: ", error);
        res.status(404).send("Could not get all products") 
    }
}

exports.orderPost = async (req, res, next) => {
    console.log(`ordering - ${req.params.name}: ${JSON.stringify(req.body)}`)

    try {
        const product = await Product.findOneAndUpdate({name: req.params.name}, req.body);
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

exports.post = async (req, res, next) => {
    console.log("Post done for product ", req.body.name);
    const product = new Product(req.body)
    try {
        let saved = await product.save();
        res.status(200).send({
            message: 'Product created successfully'
        })    
    } catch (error) {
        res.status(500).send({
            message: 'Failure on registering product'
        })
    
    }
}

exports.updatePost = async (req, res, next) => {
    console.log(`updating - ${req.params.name}: ${JSON.stringify(req.body)}`)

    try {
        const product = await Product.findOneAndUpdate({name: req.params.name}, req.body);
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
    console.log(`delete done - ${req.params.name}`)

    try {
        const product = await Product.findOneAndRemove({name: req.params.name});
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