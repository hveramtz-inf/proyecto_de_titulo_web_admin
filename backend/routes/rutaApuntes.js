const express = require('express');
const ApunteModel = require('../models/ApunteModel.js');

const router = express.Router();

// Obtener todos los apuntes
router.get('/', async (req, res) => {
    try {
        const apuntes = await ApunteModel.findAll();
        res.json(apuntes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);

// Obtener un apunte por ID
router.get('/:id', async (req, res) => {
    try
    {
        const apunte = await ApunteModel.findByPk(req.params.id);
        if (apunte) {
            res.apunte = apunte;
        } else {
            res.status(404).json({ message: 'Apunte no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    res.json(res.apunte);
});

router.get('/estudiante/:idestudiante/seccion/:idseccion', async (req, res) => {
    try {
        const apunte = await ApunteModel.findOne({
            where: {
                idestudiante: req.params.idestudiante,
                seccionid: req.params.idseccion
            }
        });
        if (apunte) {
            res.apunte = apunte;
        } else {
            res.status(404).json({ message: 'Apunte no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    res.json(res.apunte);
});

// Crear un nuevo apunte
router.post('/', async (req, res) => {
    const apunte = new ApunteModel({
        idestudiante: req.body.idestudiante,
        seccionid: req.body.idseccion,
        apunte: req.body.apunte
    });

    try {
        const nuevoApunte = await apunte.save();
        res.status(201).json(nuevoApunte);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Actualizar un apunte
router.put('/:id', async (req, res) => {
    try {
        const apunte = await ApunteModel.findByPk(req.params.id);
        if (!apunte) {
            return res.status(404).json({ message: 'Apunte no encontrado' });
        }

        if (req.body.apunte != null) {
            apunte.apunte = req.body.apunte;
        }

        const updatedApunte = await apunte.save();
        res.json(updatedApunte);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar un apunte
// Eliminar un apunte
router.delete('/:id', async (req, res) => {
    try {
        const apunte = await ApunteModel.findByPk(req.params.id);
        if (!apunte) {
            return res.status(404).json({ message: 'Apunte no encontrado' });
        }
        await apunte.destroy();
        res.json({ message: 'Apunte eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;