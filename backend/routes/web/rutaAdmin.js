const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/adminController.js');

// Rutas que no requieren autenticación
router.post('/iniciosesion', adminController.iniciarSesion);

// Rutas que requieren autenticación
router.post('/', adminController.createAdmin);
router.get('/', adminController.getAllAdmins);
router.get('/:id', adminController.getAdminById);
router.put('/:id', adminController.updateAdmin);
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;