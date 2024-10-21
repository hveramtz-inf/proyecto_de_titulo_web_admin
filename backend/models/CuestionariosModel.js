const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db.js');
const CursoModel = require('./CursoModel.js'); // Asegúrate de que la ruta sea correcta

const Cuestionario = sequelize.define('Cuestionario', {
  id: {
    type: DataTypes.UUID, // Usa UUID como tipo de dato
    defaultValue: DataTypes.UUIDV4, // Genera automáticamente un UUID si no se proporciona
    primaryKey: true
  },
  idcurso: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: CursoModel,
      key: 'id'
    }
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'cuestionario',
  timestamps: false
});

// Establecer la relación
Cuestionario.belongsTo(CursoModel, { foreignKey: 'idcurso', as: 'Curso' });

module.exports = Cuestionario;