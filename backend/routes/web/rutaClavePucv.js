const express = require('express');
const router = express.Router();
const clavePucvController = require('../../controllers/clavePucvController.js');
const verifyToken = require('../../middlewares/authMiddleware.js');

// Rutas que no requieren autenticación
router.get('/', clavePucvController.getAllClavesPucv);
router.get('/:id', clavePucvController.getClavePucvById);


// Rutas que requieren autenticación
router.post('/', verifyToken, clavePucvController.createClavePucv);
router.put('/:id', verifyToken, clavePucvController.updateClavePucv);
router.delete('/:id', verifyToken, clavePucvController.deleteClavePucv);
router.get('/docente/:idDocente',verifyToken, clavePucvController.getClavesPucvByDocente);

module.exports = router;