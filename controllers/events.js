const { response } = require('express');
const Event = require('../models/Event-model');

const getEvents = async ( req, res = response ) => {

    try {
        //se pueden incluir condiciones en find()
        //el segundo parámetro de populate es que atributo/s quiero que devuelva (para mas de un valor van separados con espacios)
        const events = await Event.find({ user: req.uid }).populate('user','name');

        //const events = await User.findOne({ email });
        res.status(201).json({
            ok: true,
            events
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los eventos.'
        });
    }
}

const createEvent = async ( req, res = response ) => {

    try {
        
        const event = new Event( req.body );

        event.user = req.uid;
            
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
        
        const eventId = req.params.id;

        const event = await Event.findById(eventId);
        if(!event) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el evento.'
            });
        }

        if( event.user.toString() !== req.uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar el evento.'
            });
        }

        const eventUpdate = {
            ...req.body,
            user: req.uid
        }
        
        //si no se envía new: true, eventUpdated recibe el objeto previo a la modificación
        const eventUpdated = await Event.findByIdAndUpdate( eventId, eventUpdate, { new: true } );

        res.status(201).json({
            ok: true,
            event: eventUpdated
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
        
        const eventId = req.params.id;

        const event = await Event.findById(eventId);
        if(!event) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el evento.'
            });
        }

        if( event.user.toString() !== req.uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar el evento.'
            });
        }

        //si no se envía new: true, eventUpdated recibe el objeto previo a la modificación
        const eventDeleted = await Event.findByIdAndDelete( eventId );

        res.status(201).json({
            ok: true,
            event: eventDeleted
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar evento.'
        });
    }
}



module.exports = {
    createEvent, getEvents, updateEvent, deleteEvent
};