const { DataTypes } = require('sequelize');
const db = require('../database/db');

const FavoritosCalculadora = db.define('FavoritosCalculadora', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    idestudiante: {
        type: DataTypes.UUID,
        allowNull: false
    },
    idcalculadora: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    tableName: 'favoritos_calculadoras',
    timestamps: false
});

module.exports = FavoritosCalculadora;