const { DataTypes } = require('sequelize');
const sequelize = require('../database/db.js');

const RespuestaCuestionario = sequelize.define('RespuestaCuestionario', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    idpregunta: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Pregunta',
            key: 'id'
        }
    },
    respuesta: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    valor: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'respuesta',
    timestamps: false
});

module.exports = RespuestaCuestionario;