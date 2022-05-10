const Usuarios = require("../models/Usuarios");

exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina : 'Crear Cuenta en Uptask'
    })
}

exports.crearCuenta = async (req, res) => {
    // Leer los datos
    const {email, password} = req.body;

    try {
         // Crear el usuario
        await Usuarios.create({
            email,
            password
        });
        res.redirect('/iniciar-sesion')
        
    } catch (error) {
        req.flash('error', error.errors.map(error => error.message));
        res.render('crearCuenta', {
            mensajes: req.flash(),
            nombrePagina : 'Crear Cuenta en Uptask',
            email,
            password
        });
    }

   

}