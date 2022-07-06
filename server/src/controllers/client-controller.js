'use strict'

const mongoose = require('mongoose');
const Client = mongoose.model('Client');
const authService = require('../services/auth-service')
const md5 = require('md5');

exports.get = async (req, res, next) => {
    console.log(`get done - ${req.params.cpf}: ${JSON.stringify(req.body)}`)

    try {
        const client = await Client.findOne({cpf: req.params.cpf});
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
    console.log(`post done - ${req.params.cpf}: ${JSON.stringify(req.body)}`)
    req.body.password = md5(req.body.password + process.env.SALT_KEY);
    req.body.roles = ['user']
    
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
    console.log(`get done - ${req.params.cpf}: ${JSON.stringify(req.body)}`)

    console.log("req.body.password - ", req.body.password);
    if (req.body.password !== undefined) {
        req.body.password = md5(req.body.password + process.env.SALT_KEY);
    }
    try {
        const client = await Client.findOneAndUpdate({cpf: req.params.cpf}, req.body);
        console.log("client before update: ", client);
        const client2 = await Client.findOne({ cpf: req.body.cpf });
        console.log("client after update: ", client2);
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

exports.authenticate = async(req, res, next) => {
    console.log("authentication attempted: ", req.body)

    req.body.password = md5(req.body.password + process.env.SALT_KEY);
    console.log("hashed password: ", req.body.password);
    try {
        const client = await Client.findOne({ cpf: req.body.cpf, password: req.body.password });
        if (!client) {
            res.status(404).send({ message: 'Invalid CPF or Password' });
            return;
        }

        const token = await authService.generateToken({
            cpf: client.cpf,
            name: client.name,
            roles: client.roles
        });

        res.status(201).send({
            token: token.value,
            expiry: token.expiry.toUTCString(),
            data: {
                cpf: client.cpf,
                name: client.name,
                roles: client.roles
            }
        });
    } catch (error) {

    }
}

exports.refreshToken = async(req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-acess-token'];
        console.log("got token: ", token);
        const data = await authService.decodeToken(token);
        console.log("decoded data: ", data);

        const client = await Client.find({ cpf: data.cpf });
        if (!client) {
            res.status(404).send({ message: 'CPF ou senha inválidos' });
            return;
        }

        const tokenData = await authService.generateToken({
            cpf: client.cpf,
            name: client.name,
            roles: client.roles
        });

        res.status(201).send({
            token: token.value,
            expiry: token.expiry.toUTCString(),
            data: {
                cpf: client.cpf,
                name: client.name
            }
        });
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' })
    }
}