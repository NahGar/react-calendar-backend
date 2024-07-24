const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');

//Crear servidor de express
const app = express();

//Base de datos
dbConnection();

//Directorio Público
app.use( express.static('public'));


//Lectura y parseo del body
app.use( express.json() );

//Rutas
app.use('/api/auth', require('./routes/auth'));


//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log("Escuchando puerto " + process.env.PORT);
});