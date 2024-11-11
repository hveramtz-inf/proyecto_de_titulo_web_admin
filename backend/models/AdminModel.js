const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db.js');

const Admin = sequelize.define('Admin', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    contrasenia: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'admin',
    timestamps: false
});

module.exports = Admin;