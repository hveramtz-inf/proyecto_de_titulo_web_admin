const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const ClavePucv = sequelize.define('clavepucv', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Clave: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'clavepucv',
    timestamps: false
});

module.exports = ClavePucv;