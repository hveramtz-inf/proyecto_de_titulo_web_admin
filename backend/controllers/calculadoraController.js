const Calculadora = require('../models/CalculadoraModel.js');
const FavoritosCalculadora = require('../models/FavoritosCalculadoraModel.js');
const HistorialCalculadora = require('../models/HistorialModel.js');
const VariableHistorial = require('../models/VariableHistorialModel.js');

// Obtener todas las calculadoras
exports.getAllCalculadoras = async (req, res) => {
  try {
    const calculadoras = await Calculadora.findAll();
    res.json(calculadoras);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las calculadoras' });
  }
};

// Obtener una calculadora por ID
exports.getCalculadoraById = async (req, res) => {
  try {
    const calculadora = await Calculadora.findByPk(req.params.id);
    if (calculadora) {
      res.json(calculadora);
    } else {
      res.status(404).json({ error: 'Calculadora no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la calculadora' });
  }
};

// Obtener calculadoras por clave PUCV
exports.getCalculadorasByClavePucv = async (req, res) => {
  try {
    const calculadoras = await Calculadora.findAll({ where: { idclavepucv: req.params.id } });
    if (calculadoras.length > 0) {
      res.json(calculadoras);
    } else {
      res.status(404).json({ error: 'Calculadoras no encontradas' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las calculadoras' });
  }
};

// Crear una nueva calculadora (requiere autenticación)
exports.createCalculadora = async (req, res) => {
  try {
    const nuevaCalculadora = await Calculadora.create(req.body);
    res.status(201).json(nuevaCalculadora);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la calculadora' });
  }
};

// Actualizar una calculadora existente (requiere autenticación)
exports.updateCalculadora = async (req, res) => {
  try {
    const calculadora = await Calculadora.findByPk(req.params.id);
    if (calculadora) {
      await calculadora.update(req.body);
      res.json(calculadora);
    } else {
      res.status(404).json({ error: 'Calculadora no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la calculadora' });
  }
};

// Eliminar una calculadora (requiere autenticación)
exports.deleteCalculadora = async (req, res) => {
  const { id } = req.params;
  const transaction = await Calculadora.sequelize.transaction();
  try {
    const calculadoraEliminar = await Calculadora.findByPk(id, { transaction });

    if (!calculadoraEliminar) {
      return res.status(404).json({ message: 'Calculadora no encontrada' });
    }

    // Eliminar favoritos asociados a la calculadora
    await FavoritosCalculadora.destroy({ where: { idcalculadora: id }, transaction });

    // Eliminar historial y variables de historial asociados a la calculadora
    const historiales = await HistorialCalculadora.findAll({ where: { idcalculadora: id }, transaction });
    for (const historial of historiales) {
      await VariableHistorial.destroy({ where: { idhistorial: historial.id }, transaction });
      await historial.destroy({ transaction });
    }

    // Eliminar la calculadora
    await calculadoraEliminar.destroy({ transaction });

    await transaction.commit();
    res.json({ message: 'Calculadora y registros relacionados eliminados correctamente' });
  } catch (error) {
    await transaction.rollback();
    console.error('Error al eliminar la calculadora y sus relaciones', error);
    res.status(500).json({ message: 'Error al eliminar la calculadora y sus relaciones' });
  }
};