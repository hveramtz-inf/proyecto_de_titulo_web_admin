const { DataTypes } = require('sequelize');
const sequelize = require('../database/db.js');

const PreguntaCuestionario = sequelize.define('PreguntaCuestionario', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    idcuestionario: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Cuestionario',
            key: 'id'
        }
    },
    pregunta: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'pregunta',
    timestamps: false
});

module.exports = PreguntaCuestionario;