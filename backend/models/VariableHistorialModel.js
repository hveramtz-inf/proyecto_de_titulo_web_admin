const { DataTypes } = require('sequelize');
const db = require('../database/db');

const VariableHistorial = db.define('VariableHistorial', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    idhistorial: {
        type: DataTypes.UUID,
        allowNull: false
    },
    variable: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'variablehistorial',
    timestamps: false
});

module.exports = VariableHistorial;