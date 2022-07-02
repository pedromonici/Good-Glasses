'use strict'

const mongoose = require('mongoose');
const Client = mongoose.model('Client');

exports.get = async (req, res, next) => {
    const key = req.params.key
    console.log(`get done - ${key}: ${JSON.stringify(req.body)}`)

    try {
        const client = await Client.findOne({cpf: key});
        console.log("client: ", client);
        res.status(200).send(client)
    } catch (error) {
        console.log("error: ", error);
        res.status(400).send("Could not find requested client") 
    }
}

exports.getAll = async (req, res, next) => {
    console.log(`get done for all clients`)

    try {
        const clients = (await Client.find()).reduce((clientsObj, client) => {
            clientsObj[client.cpf] = client;
            return clientsObj;
        }, {});
        console.log("clients: ", clients);
        res.status(200).send(clients)
    } catch (error) {
        console.log("error: ", error);
        res.status(400).send("Could not get all clients") 
    }
}

exports.post = async (req, res, next) => {
    // console.log(`post done - ${key}: ${JSON.stringify(req.body)}`)
    const client = new Client(req.body)
    try {
        let saved = await client.save();
        res.status(200).send({
            message: 'Client created sucessfully'
        })    
    } catch (error) {
        res.status(400).send({
            message: 'Failure on registering client'
        })
    
    }
}

exports.updatePost = async (req, res, next) => {
    const key = req.params.key
    console.log(`get done - ${key}: ${JSON.stringify(req.body)}`)

    try {
        const client = await Client.findOneAndUpdate({cpf: key}, req.body);
        console.log("client: ", client);
        client.update()
        res.status(200).send({
            message: 'Client updated sucessfully'
        })    
    } catch (error) {
        console.log(error);
        res.status(401).send({
            message: 'Failure on updating client'
        })
    
    }
}