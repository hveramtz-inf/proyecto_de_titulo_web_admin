const { DataTypes } = require('sequelize');
const db = require('../database/db');

const ProgresoCurso = db.define('progresocurso', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    idestudiante: {
        type: DataTypes.UUID,
        allowNull: false
    },
    idcurso: {
        type: DataTypes.UUID,
        allowNull: false
    },
    progreso: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'progresocurso',
    timestamps: false
});

module.exports = ProgresoCurso;