const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

// Crerar la conexion a la base de datso
const db = require('./config/db');

db.authenticate()
    .then(() => console.log('Conectado al Servidor'))
    .catch(error => console.log(error))

// Crear una app de express
const app = express();

// Donde cargar los archivos estaticos
app.use(express.static('public'));

// Habilitar Pug
app.set('view engine', 'pug');

// Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// Habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended: true}));

// Ruta para el home
app.use('/', routes());

app.listen(3000);
