const { DataTypes } = require('sequelize');
const db = require('../database/db');
const ClavePucvModel = require('./clavePucvModel'); // Asegúrate de que la ruta sea correcta

// Definir el modelo de Estudiante
const EstudianteModel = db.define('estudiante', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rut: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contrasenia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clavepucv: { // Nueva columna para la clave foránea
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: ClavePucvModel,
      key: 'id'
    }
  },
}, {
  tableName: 'estudiante',
  timestamps: false, // Desactiva los campos createdAt y updatedAt
});

// Establecer la relación
EstudianteModel.belongsTo(ClavePucvModel, { foreignKey: 'clavepucv', as: 'ClavePucv' });

module.exports = EstudianteModel;