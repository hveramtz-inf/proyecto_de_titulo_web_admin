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
router.get('/:cursoId/:cuestionarioId', async (req, res) => {
    try {
        const { cursoId, cuestionarioId } = req.params;
        const cuestionarioDoc = await db.collection('Curso').doc(cursoId).collection('cuestionarios').doc(cuestionarioId).get();
        if (!cuestionarioDoc.exists) {
            return res.status(404).json({ error: 'Cuestionario no encontrado' });
        }

        const cuestionarioData = { id: cuestionarioDoc.id, ...cuestionarioDoc.data() };

        // Obtener las preguntas del cuestionario
        const preguntasSnapshot = await db.collection('Curso').doc(cursoId).collection('cuestionarios').doc(cuestionarioId).collection('preguntas').get();
        const preguntas = [];
        for (const preguntaDoc of preguntasSnapshot.docs) {
            const preguntaData = { id: preguntaDoc.id, ...preguntaDoc.data() };

            // Obtener las respuestas de cada pregunta
            const respuestasSnapshot = await preguntaDoc.ref.collection('respuestas').get();
            const respuestas = respuestasSnapshot.docs.map(respuestaDoc => ({ id: respuestaDoc.id, ...respuestaDoc.data() }));
            preguntaData.respuestas = respuestas;

            preguntas.push(preguntaData);
        }

        cuestionarioData.preguntas = preguntas;

        res.status(200).json(cuestionarioData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear una nueva sección en un curso
router.post('/:cursoId', async (req, res) => {
    try {
        const { cursoId } = req.params;
        const { titulo, preguntas } = req.body; // Asegúrate de que el cuerpo de la solicitud incluya las preguntas
        const nuevoCuestionario = { titulo };
        const cuestionarioRef = await db.collection('Curso').doc(cursoId).collection('cuestionarios').add(nuevoCuestionario);

        // Agregar preguntas y respuestas
        for (const preguntaObj of preguntas) {
            const { textoPregunta, respuestas } = preguntaObj;
            const preguntaRef = await cuestionarioRef.collection('preguntas').add({ textoPregunta });

            for (const respuestaObj of respuestas) {
                const { textoRespuesta, valor } = respuestaObj;
                await preguntaRef.collection('respuestas').add({ textoRespuesta, valor });
            }
        }

        res.status(201).json({ id: cuestionarioRef.id, ...nuevoCuestionario });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar una sección existente en un curso
router.put('/:cursoId/:cuestionarioId', async (req, res) => {
    try {
        const { cursoId, cuestionarioId } = req.params;
        const { titulo, preguntas } = req.body;
        const cuestionarioActualizado = { titulo };
        const cuestionarioRef = db.collection('Curso').doc(cursoId).collection('cuestionarios').doc(cuestionarioId);

        // Actualizar el cuestionario
        await cuestionarioRef.update(cuestionarioActualizado);

        // Eliminar preguntas y respuestas existentes
        const preguntasSnapshot = await cuestionarioRef.collection('preguntas').get();
        const batch = db.batch();
        preguntasSnapshot.forEach(doc => {
            batch.delete(doc.ref);
        });
        await batch.commit();

        // Agregar nuevas preguntas y respuestas
        for (const preguntaObj of preguntas) {
            const { textoPregunta, respuestas } = preguntaObj;
            const preguntaRef = await cuestionarioRef.collection('preguntas').add({ textoPregunta });

            for (const respuestaObj of respuestas) {
                const { textoRespuesta, valor } = respuestaObj;
                await preguntaRef.collection('respuestas').add({ textoRespuesta, valor });
            }
        }

        res.status(200).json({ id: cuestionarioId, ...cuestionarioActualizado });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar una sección de un curso
router.delete('/:cursoId/:cuestionarioId', async (req, res) => {
    try {
        const { cursoId, cuestionarioId } = req.params;
        await db.collection('Curso').doc(cursoId).collection('cuestionarios').doc(cuestionarioId).delete();
        res.status(200).json({ message: 'Cuestionario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;