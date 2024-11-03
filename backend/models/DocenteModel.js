const { DataTypes } = require('sequelize');
const db = require('../database/db');

const Docente = db.define('Docente', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    rut: {
        type: DataTypes.STRING(9),
        allowNull: false
    },
    contrasenia: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'docente',
    timestamps: false
});

module.exports = Docente;