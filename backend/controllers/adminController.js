const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/AdminModel.js');

const secretKey = 'your_secret_key'; // Cambia esto por una clave secreta segura

// Iniciar sesión
exports.iniciarSesion = async (req, res) => {
    try {
        const { username, contrasenia } = req.body;
        const admin = await Admin.findOne({ where: { username } });
        if (admin && await bcrypt.compare(contrasenia, admin.contrasenia)) {
            const token = jwt.sign({ id: admin.id }, secretKey, { expiresIn: '20m' });
            res.json({ admin, token });
        } else {
            res.status(404).json({ error: 'Admin no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo admin
exports.createAdmin = async (req, res) => {
    try {
        const { username, contrasenia } = req.body;
        const hashedPassword = await bcrypt.hash(contrasenia, 10);
        const newAdmin = await Admin.create({ username, contrasenia: hashedPassword });
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los admins
exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un admin por ID
exports.getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.id);
        if (admin) {
            res.json(admin);
        } else {
            res.status(404).json({ error: 'Admin no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un admin existente
exports.updateAdmin = async (req, res) => {
    try {
        const { contrasenia, ...rest } = req.body;
        const updateData = { ...rest };
        if (contrasenia) {
            updateData.contrasenia = await bcrypt.hash(contrasenia, 10);
        }
        const [updated] = await Admin.update(updateData, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedAdmin = await Admin.findByPk(req.params.id);
            res.json(updatedAdmin);
        } else {
            res.status(404).json({ error: 'Admin no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un admin
exports.deleteAdmin = async (req, res) => {
    try {
        const deleted = await Admin.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Admin no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};