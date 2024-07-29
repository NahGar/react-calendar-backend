const { response } = require('express');
const Event = require('../models/Event-model');

const createEvent = async ( req, res = response ) => {

    try {
        
        const event = new Event({
            ...req.body,
            user: {
                _id: req.uid
            }
        });
            
        const savedEvent = await event.save();


        res.status(201).json({
            ok: true,
            event: savedEvent
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear evento.'
        });
    }

}

const updateEvent = async ( req, res = response ) => {

    try {
        
        //const events = await User.findOne({ email });
        res.status(201).json({
            ok: true,
            msg: 'Ejecutado update'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al modificar evento.'
        });
    }
}

const deleteEvent = async ( req, res = response ) => {

    try {
        
        //const events = await User.findOne({ email });
        res.status(201).json({
            ok: true,
            msg: 'Ejecutado delete'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar evento.'
        });
    }
}


const getEvents = async ( req, res = response ) => {

    try {
        
        //const events = await User.findOne({ email });
        res.status(201).json({
            ok: true,
            msg: 'Ejecutado get'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los eventos.'
        });
    }
}

module.exports = {
    createEvent, getEvents, updateEvent, deleteEvent
};