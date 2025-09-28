const pool = require('../config/database');

const PlatillosModel = {
  // Obtener todos los platillos
  async getAll() {
    const result = await pool.query(
      'SELECT * FROM platillos ORDER BY id DESC'
    );
    return result.rows;
  },

  // Obtener un platillo por ID
  async getById(id) {
    const result = await pool.query(
      'SELECT * FROM platillos WHERE id = $1',
      [id]
    );
    return result.rows[0];
  },

  // Crear nuevo platillo
  async create(platilloData) {
    const { nombre, categoria, precio, descripcion, ingredientes, tiempo_preparacion } = platilloData;
    
    const result = await pool.query(
      `INSERT INTO platillos 
       (nombre, categoria, precio, descripcion, ingredientes, tiempo_preparacion) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [nombre, categoria, precio, descripcion, ingredientes, tiempo_preparacion || 5]
    );
    
    return result.rows[0];
  },

  // Actualizar platillo
  async update(id, platilloData) {
    const { nombre, categoria, precio, descripcion, ingredientes, disponible, tiempo_preparacion } = platilloData;
    
    const result = await pool.query(
      `UPDATE platillos 
       SET nombre = $1, categoria = $2, precio = $3, descripcion = $4, 
           ingredientes = $5, disponible = $6, tiempo_preparacion = $7,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $8 
       RETURNING *`,
      [nombre, categoria, precio, descripcion, ingredientes, disponible, tiempo_preparacion, id]
    );
    
    return result.rows[0];
  },

  // Eliminar platillo
  async delete(id) {
    const result = await pool.query(
      'DELETE FROM platillos WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }
};

module.exports = PlatillosModel;
