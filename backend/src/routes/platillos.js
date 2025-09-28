const express = require('express');
const router = express.Router();
const platillosController = require('../controllers/platillosController');

// GET /api/platillos - Obtener todos los platillos
router.get('/', platillosController.getAll);

// GET /api/platillos/:id - Obtener un platillo
router.get('/:id', platillosController.getById);

// POST /api/platillos - Crear nuevo platillo
router.post('/', platillosController.create);

// PUT /api/platillos/:id - Actualizar platillo
router.put('/:id', platillosController.update);

// DELETE /api/platillos/:id - Eliminar platillo
router.delete('/:id', platillosController.delete);

module.exports = router;
