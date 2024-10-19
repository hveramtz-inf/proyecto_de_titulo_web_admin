const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const ClavePucvModel = require('./clavePucvModel'); // Asegúrate de que la ruta sea correcta

const Curso = sequelize.define('curso', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idclavepucv: {
        type: DataTypes.INTEGER,
        references: {
            model: 'clavepucv', // Nombre de la tabla referenciada
            key: 'id'
        }
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'curso',
    timestamps: false
});

Curso.belongsTo(ClavePucvModel, { foreignKey: 'idclavepucv', as: 'ClavePucv' });

module.exports = Curso;