const express = require('express');
const router = express.Router();

// Importar el controlador
const proyectoController = require('../controllers/proyectosController');

module.exports = function() {
    // Ruta para el home
    router.get('/', proyectoController.proyectosHome);
    router.get('/nuevo-proyecto', proyectoController.formularioProyecto);

    router.post('/nuevo-proyecto', proyectoController.nuevoProyecto);

    return router;
}