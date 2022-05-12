const express = require('express');
const router = express.Router();

// Importar express validator
const { body } = require('express-validator/check');

// Importar el controlador
const proyectoController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const outController = require('../controllers/outController');

module.exports = function() {
    // Ruta para el home
    router.get('/',
        outController.usuarioAutenticado,
        proyectoController.proyectosHome
    );
    router.get('/nuevo-proyecto',
        outController.usuarioAutenticado,
        proyectoController.formularioProyecto
    );
    router.post('/nuevo-proyecto',
        outController.usuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape(),
        proyectoController.nuevoProyecto
    );

    // Listar Proyecto
    router.get('/proyectos/:url',
        outController.usuarioAutenticado,
        proyectoController.proyectoPorUrl
    );

    // Actualizar el Proyecto
    router.get('/proyecto/editar/:id',
        outController.usuarioAutenticado,
        proyectoController.formularioEditar
    );

    router.post('/nuevo-proyecto/:id',
        outController.usuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape(),
        proyectoController.actualizarProyecto
    );

    // Eliminar Proyecto
    router.delete('/proyectos/:url',
        outController.usuarioAutenticado,
        proyectoController.eliminarProyecto
    );

    // Tareas
    router.post('/proyectos/:url',
        outController.usuarioAutenticado,
        tareasController.agregarTarea
    );

    // Actualizar Tarea
    router.patch('/tareas/:id',
        outController.usuarioAutenticado,
        tareasController.cambiarEstadoTarea
    );

    // Eliminar Tarea
    router.delete('/tareas/:id',
        outController.usuarioAutenticado,
        tareasController.eliminarTarea
    );

    // Crear nueva cuenta
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    router.post('/crear-cuenta', usuariosController.crearCuenta);

    // Iniciar Sesion
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
    router.post('/iniciar-sesion', outController.autenticarUsuario);

    // Cerrar Sesion
    router.get('/cerrar-sesion', outController.cerrarSesion);

    // Restablecer Contraseña
    router.get('/reestablecer', usuariosController.formRestablecerPassword);
    router.post('/reestablecer', outController.enviarToken);
    router.get('/reestablecer/:token', outController.validarToken);
    router.post('/reestablecer/:token', outController.actualizarPassword);
    
    return router;
}