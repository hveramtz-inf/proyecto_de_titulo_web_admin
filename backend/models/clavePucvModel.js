const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db.js');

const ClavePucv = sequelize.define('ClavePucv', {
    id: {
        type: DataTypes.UUID, // Usa UUID como tipo de dato
        defaultValue: DataTypes.UUIDV4, // Genera automáticamente un UUID si no se proporciona
        primaryKey: true
    },
    clave: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'clavepucv',
    timestamps: false
});

module.exports = ClavePucv;