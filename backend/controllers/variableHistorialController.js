const VariableHistorial = require('../models/VariableHistorialModel.js');

// Obtener todos los registros de VariableHistorial
exports.getAllVariablesHistorial = async (req, res) => {
  try {
    const records = await VariableHistorial.findAll();
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los registros' });
  }
};

// Obtener un registro de VariableHistorial por ID
exports.getVariableHistorialById = async (req, res) => {
  try {
    const record = await VariableHistorial.findByPk(req.params.id);
    if (record) {
      res.json(record);
    } else {
      res.status(404).json({ error: 'Registro no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el registro' });
  }
};

// Obtener registros de VariableHistorial por ID de historial
exports.getVariablesHistorialByHistorialId = async (req, res) => {
  try {
    const records = await VariableHistorial.findAll({
      where: {
        idhistorial: req.params.idhistorial
      }
    });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los registros' });
  }
};

// Crear un nuevo registro de VariableHistorial
exports.createVariableHistorial = async (req, res) => {
  try {
    const newRecord = await VariableHistorial.create(req.body);
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el registro' });
  }
};

// Actualizar un registro de VariableHistorial por ID
exports.updateVariableHistorial = async (req, res) => {
  try {
    const record = await VariableHistorial.findByPk(req.params.id);
    if (record) {
      await record.update(req.body);
      res.json(record);
    } else {
      res.status(404).json({ error: 'Registro no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el registro' });
  }
};

// Eliminar un registro de VariableHistorial por ID
exports.deleteVariableHistorial = async (req, res) => {
  try {
    const record = await VariableHistorial.findByPk(req.params.id);
    if (record) {
      await record.destroy();
      res.json({ message: 'Registro eliminado' });
    } else {
      res.status(404).json({ error: 'Registro no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el registro' });
  }
};