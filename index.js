const express = require('express');
require('dotenv').config();

//Crear servidor de express
const app = express();

//Directorio Público
app.use( express.static('public'));


//Rutas
/*
app.get('/', ( req, res ) => {
    
    res.json({
        ok: true
    })
});
*/


//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log("Escuchando puerto " + process.env.PORT);
});