const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Docente = require('../models/DocenteModel');

const router = express.Router();
const secretKey = 'your_secret_key'; // Cambia esto por una clave secreta segura

// Get all docentes
router.get('/', async (req, res) => {
    try {
        const docentes = await Docente.findAll();
        res.json(docentes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single docente by ID
router.get('/:id', async (req, res) => {
    try {
        const docente = await Docente.findByPk(req.params.id);
        if (docente) {
            res.json(docente);
        } else {
            res.status(404).json({ error: 'Docente not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/iniciosesion', async (req, res) => {
    try {
        const { rut, contrasenia } = req.body;
        const docente = await Docente.findOne({ where: { rut } });
        if (docente && await bcrypt.compare(contrasenia, docente.contrasenia)) {
            const token = jwt.sign({ id: docente.id }, secretKey, { expiresIn: '20m' });
            res.json({ docente, token });
        } else {
            res.status(404).json({ error: 'Docente not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new docente
router.post('/', async (req, res) => {
    try {
        const { rut, contrasenia, ...rest } = req.body;
        const hashedPassword = await bcrypt.hash(contrasenia, 10);
        const newDocente = await Docente.create({ rut, contrasenia: hashedPassword, ...rest });
        res.status(201).json(newDocente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an existing docente
router.put('/:id', async (req, res) => {
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
            res.status(404).json({ error: 'Docente not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a docente
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Docente.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Docente not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;