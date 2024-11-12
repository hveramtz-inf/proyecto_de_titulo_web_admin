const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/adminController.js');
const verifyToken = require('../../middlewares/authMiddleware.js');

// Rutas que no requieren autenticación
router.post('/iniciosesion', adminController.iniciarSesion);

// Rutas que requieren autenticación
router.post('/',verifyToken, adminController.createAdmin);
router.get('/',verifyToken, adminController.getAllAdmins);
router.get('/:id',verifyToken, adminController.getAdminById);
router.put('/:id',verifyToken, adminController.updateAdmin);
router.delete('/:id',verifyToken, adminController.deleteAdmin);

module.exports = router;