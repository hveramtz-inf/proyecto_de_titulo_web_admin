const { DataTypes } = require('sequelize');
const db = require('../database/db');

const HistorialCalculadora = db.define('historialcalculadora', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    idcalculadora: {
        type: DataTypes.UUID,
        allowNull: false
    },
    idestudiante: {
        type: DataTypes.UUID,
        allowNull: false
    },
    formulalatex: {
        type: DataTypes.STRING,
        allowNull: false
    },
    resultado: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}, {
    tableName: 'historialcalculadora',
    timestamps: false
});

module.exports = HistorialCalculadora;