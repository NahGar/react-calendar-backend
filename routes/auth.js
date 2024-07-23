/*
    Rutas de usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validarCampos } = require('../middlewares/validar-campos');
const { createUser, loginUser, revalidateToken } = require('../controllers/auth');

router.post('/new', 
    [ //middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio y debe ser un email válido').isEmail(),
        check('password', 'El password debe tener mínimo 6 caracteres').isLength({ min: 6 }),
        validarCampos,
    ], 
    createUser );

router.post('/',
    [ //middlewares
        check('email', 'El email es obligatorio y debe ser un email válido').isEmail(),
        check('password', 'El password debe tener mínimo 6 caracteres').isLength({ min: 6 }),
        validarCampos,
    ],
    loginUser );

router.get('/renew', revalidateToken );

module.exports = router;