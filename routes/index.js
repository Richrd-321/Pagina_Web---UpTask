const express = require('express');
const router = express.Router();

// Importar el controlador
const proyectoController = require('../controllers/proyectosController');

module.exports = function() {
    // Ruta para el home
    router.get('/', proyectoController.proyectosHome);

    router.get('/nosotros', (req, res) => {
        res.render('nosotros');
    })

    return router;
}





