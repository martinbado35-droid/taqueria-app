const PlatillosModel = require('../models/platillos');

const platillosController = {
  // GET /api/platillos - Obtener todos los platillos
  async getAll(req, res) {
    try {
      const platillos = await PlatillosModel.getAll();
      res.json({
        success: true,
        data: platillos,
        count: platillos.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener platillos',
        error: error.message
      });
    }
  },

  // GET /api/platillos/:id - Obtener un platillo por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const platillo = await PlatillosModel.getById(id);
      
      if (!platillo) {
        return res.status(404).json({
          success: false,
          message: 'Platillo no encontrado'
        });
      }
      
      res.json({
        success: true,
        data: platillo
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener platillo',
        error: error.message
      });
    }
  },

  // POST /api/platillos - Crear nuevo platillo
  async create(req, res) {
    try {
      const platilloData = req.body;
      
      // Validaciones básicas
      if (!platilloData.nombre || !platilloData.categoria || !platilloData.precio) {
        return res.status(400).json({
          success: false,
          message: 'Nombre, categoría y precio son obligatorios'
        });
      }
      
      const nuevoPlatillo = await PlatillosModel.create(platilloData);
      
      res.status(201).json({
        success: true,
        message: 'Platillo creado exitosamente',
        data: nuevoPlatillo
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al crear platillo',
        error: error.message
      });
    }
  },

  // PUT /api/platillos/:id - Actualizar platillo
  async update(req, res) {
    try {
      const { id } = req.params;
      const platilloData = req.body;
      
      const platilloActualizado = await PlatillosModel.update(id, platilloData);
      
      if (!platilloActualizado) {
        return res.status(404).json({
          success: false,
          message: 'Platillo no encontrado'
        });
      }
      
      res.json({
        success: true,
        message: 'Platillo actualizado exitosamente',
        data: platilloActualizado
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al actualizar platillo',
        error: error.message
      });
    }
  },

  // DELETE /api/platillos/:id - Eliminar platillo
  async delete(req, res) {
    try {
      const { id } = req.params;
      
      const platilloEliminado = await PlatillosModel.delete(id);
      
      if (!platilloEliminado) {
        return res.status(404).json({
          success: false,
          message: 'Platillo no encontrado'
        });
      }
      
      res.json({
        success: true,
        message: 'Platillo eliminado exitosamente',
        data: platilloEliminado
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al eliminar platillo',
        error: error.message
      });
    }
  }
};

module.exports = platillosController;
