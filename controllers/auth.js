const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User-model');
const { generateJWT } = require('../helpers/jwt');

const createUser = async ( req, res = response ) => {

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });

        if( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese email'
            });
        }

        user = new User( req.body );
    
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt) ;

        await user.save();

        //Generar JWT
        const token = await generateJWT( user.id, user.name );
    
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear usuario.'
        });
    }
}

const loginUser = async ( req, res = response ) => {
    
    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });

        if( !user ) {
            return res.status(400).json({
                ok: false,
                msg: 'No son válidas las credenciales'
            });
        }

        if ( !bcrypt.compareSync( password, user.password )) {
            return res.status(400).json({
                ok: false,
                msg: 'No son válidas las credenciales'
            });
        }

        //Generar JWT
        const token = await generateJWT( user.id, user.name );

        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No son válidas las credenciales.'
        });
    }
   
}

const revalidateToken = async ( req, res = response ) => {
    
    // req.uid fue grabado por validateJWT
    const { uid, name } = req;

    //Generar JWT
    const token = await generateJWT( uid, name );

    res.json({
        ok: true,
        uid,
        name,
        token
    })
}

module.exports = {
    createUser, loginUser, revalidateToken
};