const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Calculadora = sequelize.define('Calculadora', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    formula: {
        type: DataTypes.STRING,
        allowNull: false
    },
    latexformula:
    {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'calculadora',
    timestamps: false
});

module.exports = Calculadora;