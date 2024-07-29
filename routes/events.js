/*
    Rutas de eventos / Events
    host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT } = require('../middlewares/validate-jwt');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validateFields } = require('../middlewares/validate-fields');
const { parmBodyIsDate } = require('../helpers/parmBodyIsDate');

const router = Router();

//aplica middleware a todas las rutas
//se puede poner rutas arriba para que no se ejecute la validación en esas rutas
router.use( validateJWT );

//Obtener eventos
router.get('/', getEvents );

//Crear evento
router.post('/', 
        [
            check('title', 'Title es obligatorio').not().isEmpty(),
            check('start', 'Start es obligatorio').custom( parmBodyIsDate ),
            check('end', 'End es obligatorio').custom( parmBodyIsDate ),
            validateFields,
        ],
        createEvent );

//Actualizar evento
router.put('/:id', updateEvent );

//Eliminar evento
router.delete('/:id', deleteEvent );


module.exports = router;