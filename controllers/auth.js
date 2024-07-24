const { response } = require('express');
const User = require('../models/User-model');

const createUser = async ( req, res = response ) => {

    const { name, email, password } = req.body;
    
    const user = new User( req.body );

    await user.save();

    res.status(201).json({
        ok: true,
        msg: "createUser"
    })
}

const loginUser = ( req, res = response ) => {
    
    const { email, password } = req.body;

    res.status(200).json({
        ok: true,
        msg: "loginUser"
    })
}

const revalidateToken = ( req, res = response ) => {
    
    res.json({
        ok: true
    })
}

module.exports = {
    createUser, loginUser, revalidateToken
};