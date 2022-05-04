const Sequelize = require('sequelize');

const db = require('../config/db');

const Proyectos = db.define('proyectos', {
    id : {
        type: Sequelize.INTEGER,
        primarykey: true,
        autoIncrement: true
    },

    nombre : Sequelize.STRING,
    url : Sequelize.STRING
});

module.exports = Proyectos;