const express = require('express');
const Calculadora = require('../models/CalculadoraModel');

const router = express.Router();

// Obtener todas las calculadoras
router.get('/', async (req, res) => {
    try {
        const calculadoras = await Calculadora.findAll();
        res.json(calculadoras);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las calculadoras' });
    }
});

// Obtener una calculadora por ID
router.get('/:id', async (req, res) => {
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
});

router.get('/clavepucv/:id', async (req, res) => {
    try {
        const calculadora = await Calculadora.findAll({ where: { idclavepucv: req.params.id } });
        if (calculadora) {
            res.json(calculadora);
        } else {
            res.status(404).json({ error: 'Calculadora no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la calculadora' });
    }
});

// Crear una nueva calculadora
router.post('/', async (req, res) => {
    try {
        const nuevaCalculadora = await Calculadora.create(req.body);
        res.status(201).json(nuevaCalculadora);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la calculadora' });
    }
});

// Actualizar una calculadora existente
router.put('/:id', async (req, res) => {
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
});

// Eliminar una calculadora
router.delete('/:id', async (req, res) => {
    try {
        const calculadora = await Calculadora.findByPk(req.params.id);
        if (calculadora) {
            await calculadora.destroy();
            res.json({ message: 'Calculadora eliminada' });
        } else {
            res.status(404).json({ error: 'Calculadora no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la calculadora' });
    }
});

module.exports = router;