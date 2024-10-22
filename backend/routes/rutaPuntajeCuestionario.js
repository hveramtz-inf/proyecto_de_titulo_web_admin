const express = require('express');
const PuntajeCuestionario = require('../models/PuntajeCuestionarioModel');

const router = express.Router();

// Obtener todos los puntajes
router.get('/', async (req, res) => {
    try {
        const puntajes = await PuntajeCuestionario.findAll();
        res.json(puntajes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un puntaje por ID
router.get('/:id', async (req, res) => {
    try {
        const puntaje = await PuntajeCuestionario.findByPk(req.params.id);
        if (puntaje) {
            res.json(puntaje);
        } else {
            res.status(404).json({ error: 'Puntaje no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Obtener puntajes por ID de estudiante
router.get('/estudiante/:idestudiante', async (req, res) => {
    try {
        const puntajes = await PuntajeCuestionario.findAll({ where: { idestudiante: req.params.idestudiante } });
        res.json(puntajes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear un nuevo puntaje
router.post('/', async (req, res) => {
    try {
        const nuevoPuntaje = await PuntajeCuestionario.create(req.body);
        res.status(201).json(nuevoPuntaje);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un puntaje por ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await PuntajeCuestionario.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedPuntaje = await PuntajeCuestionario.findByPk(req.params.id);
            res.json(updatedPuntaje);
        } else {
            res.status(404).json({ error: 'Puntaje no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar un puntaje por ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await PuntajeCuestionario.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Puntaje no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;