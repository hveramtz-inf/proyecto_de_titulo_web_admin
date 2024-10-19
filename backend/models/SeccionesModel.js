const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Seccion = sequelize.define('seccion', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idCurso: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Curso', // Nombre de la tabla referenciada
            key: 'id'
        }
    },
    contenido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    linkVideoYoutube: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'seccion',
})

module.exports = Seccion;