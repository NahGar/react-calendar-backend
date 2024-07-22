const { response } = require('express');
const { validationResult } = require('express-validator');

const createUser = ( req, res = response ) => {
    
    //manejo de errores
    const errors = validationResult( req );
    if( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    const { name, email, password } = req.body;
    
    res.status(201).json({
        ok: true,
        msg: "createUser"
    })
}

const loginUser = ( req, res = response ) => {
    
    //manejo de errores
    const errors = validationResult( req );
    if( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }
    
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