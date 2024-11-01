const { DataTypes } = require('sequelize');
const db = require('../database/db');

const SeccionRevisada = db.define('SeccionRevisada', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    idestudiante: {
        type: DataTypes.UUID,
        allowNull: false
    },
    idseccion: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    tableName: 'seccionrevisada',
    timestamps: false
});

module.exports = SeccionRevisada;