const { DataTypes } = require('sequelize');
const db = require('../database/db');

const PuntajeCuestionario = db.define('PuntajeCuestionario', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    idestudiante: {
        type: DataTypes.UUID,
        allowNull: false
    },
    idcuestionario: {
        type: DataTypes.UUID,
        allowNull: false
    },
    puntaje: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'puntajealumnocuestionario',
    timestamps: false
});

module.exports = PuntajeCuestionario;