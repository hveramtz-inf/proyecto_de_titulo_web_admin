const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db.js');

const Apunte = sequelize.define('Apunte', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    idestudiante: {
        type: DataTypes.UUID,
        allowNull: false
    },
    seccionid: {
        type: DataTypes.UUID,
        allowNull: false
    },
    apunte: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'apuntes',
    timestamps: false
});

module.exports = Apunte;