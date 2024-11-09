const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Docente = require('../models/DocenteModel.js');

const secretKey = 'your_secret_key'; // Cambia esto por una clave secreta segura

// Obtener todos los docentes
exports.getAllDocentes = async (req, res) => {
  try {
    const docentes = await Docente.findAll();
    res.json(docentes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un docente por ID
exports.getDocenteById = async (req, res) => {
  try {
    const docente = await Docente.findByPk(req.params.id);
    if (docente) {
      res.json(docente);
    } else {
      res.status(404).json({ error: 'Docente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Iniciar sesión
exports.iniciarSesion = async (req, res) => {
  try {
    const { rut, contrasenia } = req.body;
    const docente = await Docente.findOne({ where: { rut } });
    if (docente && await bcrypt.compare(contrasenia, docente.contrasenia)) {
      const token = jwt.sign({ id: docente.id }, secretKey, { expiresIn: '20m' });
      res.json({ docente, token });
    } else {
      res.status(404).json({ error: 'Docente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo docente
exports.createDocente = async (req, res) => {
  try {
    const { rut, contrasenia, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(contrasenia, 10);
    const newDocente = await Docente.create({ rut, contrasenia: hashedPassword, ...rest });
    res.status(201).json(newDocente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un docente existente
exports.updateDocente = async (req, res) => {
  try {
    const { contrasenia, ...rest } = req.body;
    const updateData = { ...rest };
    if (contrasenia) {
      updateData.contrasenia = await bcrypt.hash(contrasenia, 10);
    }
    const [updated] = await Docente.update(updateData, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedDocente = await Docente.findByPk(req.params.id);
      res.json(updatedDocente);
    } else {
      res.status(404).json({ error: 'Docente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un docente
exports.deleteDocente = async (req, res) => {
  try {
    const deleted = await Docente.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Docente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};