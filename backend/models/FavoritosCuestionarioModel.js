const { DataTypes } = require('sequelize');
const db = require('../database/db');

const FavoritosCuestionario = db.define('FavoritosCuestionario', {
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
    }
}, {
    tableName: 'favoritos_cuestionarios',
    timestamps: false
});

module.exports = FavoritosCuestionario;