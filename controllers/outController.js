const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const crypto = require('crypto');

// Autenticar el usuario
exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos Campos son Obligatorios'
});

// Función para revisar si el usuario esta logeado o no
exports.usuarioAutenticado = (req, res, next) => {
    // Si el usuario esta autenticado, adelante
    if (req.isAuthenticated()) {
        return next();
    }

    // sino esta autenticado, redirigir al formulario
    return res.redirect('/iniciar-sesion');
}

// Funcion para cerrar sesion
exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/iniciar-sesion'); // al cerrar sesion nos lleva al login
    })
}

// Funcion para generar un token si el usuario es valido
exports.enviarToken = async (req, res) => {
    // verificar que el usuario exista
    const {email} = req.body;
    const usuario = await Usuarios.findOne({where: { email }});

    // Si no hay usuario 
    if(!usuario) {
        req.flash('error', 'No existe esa cuenta');
        res.redirect('/reestablecer');
    }

    // Usuario existe
    usuario.token= crypto.randomBytes(20).toString('hex');
    usuario.expiracion = Date.now() + 3600000;

    // Guardarlos en la base de datos
    await usuario.save();

    // url de reset
    const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;

    //console.log(resetUrl);
    
}

exports.resetPasswordForm = async (req, res) => {
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token
    
        }
    });

    // Si no encuentra al usuario
    if(!usuario) {
        req.flash('error', 'No Válido');
        res.redirect('/reestablecer');
    }

    // Formulario para generar el password
    res.render('resetPassword', {
        nombrePagina : 'Reestablecer Contraseña'
    })
    

}