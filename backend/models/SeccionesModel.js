const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Seccion = sequelize.define('seccion', {
  id: {
    type: DataTypes.UUID, // Usa UUID como tipo de dato
    defaultValue: DataTypes.UUIDV4, // Genera automáticamente un UUID si no se proporciona
    primaryKey: true
  },
  idcurso: {
    type: DataTypes.UUID,
    allowNull: false
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contenido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  linkvideoyoutube: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'seccion',
  timestamps: false
});

module.exports = Seccion;