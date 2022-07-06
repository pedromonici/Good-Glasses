'use strict';
const jwt = require('jsonwebtoken')

exports.generateToken = async (data) => {
    const issued_at = Date.now()
    const expires_in = 60*60*60 // 1 hour
    return {
        value: jwt.sign({data: data, iat: Math.floor(issued_at / 1000)}, process.env.AUTH_KEY, { expiresIn: expires_in }),
        expiry: new Date(issued_at + expires_in)
    };
}

exports.decodeToken = async (token) => {
    try {
        return jwt.verify(token, process.env.AUTH_KEY);
    } catch (error) {
        console.log("Error on decoding token - ", error);
    }
}

exports.authorize = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token']
    if (!token) {
        res.status(401).json({ message: 'Restricted Access' });
        return;
    }

    jwt.verify(token, process.env.AUTH_KEY, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: 'Invalid token' });
            return;
        }

        next();
    })
}

exports.isAdmin = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token']
    if (!token) {
        res.status(401).json({ message: 'Restricted Access' });
        return;
    }

    jwt.verify(token, process.env.AUTH_KEY, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: 'Invalid token' });
            return;
        }
        
        console.log('isAdmin decoded - ', decoded);
        if (!decoded.data.roles.includes('admin')) {
            res.status(401).json({ message: 'This functionality is reserved for administrators' })
            return;
        }

        next();
    })
}