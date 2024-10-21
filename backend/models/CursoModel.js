const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db.js');

const Curso = sequelize.define('Curso', {
  id: {
    type: DataTypes.UUID, // Usa UUID como tipo de dato
    defaultValue: DataTypes.UUIDV4, // Genera automáticamente un UUID si no se proporciona
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  clavepucvid: { // Nueva columna sin referencia a otro modelo
    type: DataTypes.UUID,
    allowNull: false
  }
}, {
  tableName: 'curso',
  timestamps: false
});

module.exports = Curso;