const { DataTypes } = require('sequelize');
const db = require('../database/db');

// Definir el modelo de Estudiante
const EstudianteModel = db.define('Estudiante', {
  idestudiante: {
    type: DataTypes.UUID, // Usa UUID como tipo de dato
    defaultValue: DataTypes.UUIDV4, // Genera automáticamente un UUID si no se proporciona
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
  clavepucv: { // Nueva columna sin referencia a otro modelo
    type: DataTypes.UUID,
    allowNull: false
  },
}, {
  tableName: 'estudiante',
  timestamps: false, // Desactiva los campos createdAt y updatedAt
});

module.exports = EstudianteModel;