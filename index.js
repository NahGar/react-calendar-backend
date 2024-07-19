
const express = require('express');

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
app.listen( 4000, () => {
    console.log("Escuchando puerto 4000");
});