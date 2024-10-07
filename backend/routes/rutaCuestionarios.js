const express = require('express');
const { db } = require('../database/firebaseConfig'); // Asegúrate de ajustar la ruta según la ubicación de tu archivo firebaseConfig.js
const router = express.Router();

// Obtener todas las secciones de un curso
router.get('/:cursoId', async (req, res) => {
    try {
        const { cursoId } = req.params;
        const seccionesSnapshot = await db.collection('Curso').doc(cursoId).collection('cuestionario').get();
        const secciones = seccionesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(secciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener una sección específica de un curso
router.get('/:cursoId/:seccionId', async (req, res) => {
    try {
        const { cursoId, seccionId } = req.params;
        const seccionDoc = await db.collection('Curso').doc(cursoId).collection('cuestionario').doc(seccionId).get();
        if (!seccionDoc.exists) {
            return res.status(404).json({ error: 'Curestionario no encontrado' });
        }
        res.status(200).json({ id: seccionDoc.id, ...seccionDoc.data() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear una nueva sección en un curso
router.post('/:cursoId', async (req, res) => {
    try {
        const { cursoId } = req.params;
        const { contenido, descripcion, titulo } = req.body;
        const nuevaSeccion = { contenido, descripcion, titulo };
        const seccionRef = await db.collection('Curso').doc(cursoId).collection('cuestionario').add(nuevaSeccion);
        res.status(201).json({ id: seccionRef.id, ...nuevaSeccion });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar una sección existente en un curso
router.put('/:cursoId/:cuestionarioId', async (req, res) => {
    try {
        const { cursoId, cuestionarioId } = req.params;
        const { contenido, descripcion, titulo } = req.body;
        const cuestionarioAcutalizado = { contenido, descripcion, titulo };
        await db.collection('Curso').doc(cursoId).collection('cuestionario').doc(cuestionarioId).update(cuestionarioAcutalizado);
        res.status(200).json({ seccionId, ...seccionActualizada });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar una sección de un curso
router.delete('/:cursoId/:cuestionarioId', async (req, res) => {
    try {
        const { cursoId, cuestionarioId } = req.params;
        await db.collection('Curso').doc(cursoId).collection('cuestionario').doc(cuestionarioId).delete();
        res.status(200).json({ message: 'Cuestionario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;