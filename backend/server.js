const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/platillos', require('./src/routes/platillos'));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: '¡Taquería API está funcionando! 🎉',
    endpoints: {
      platillos: '/api/platillos',
      documentacion: 'Próximamente...'
    },
    timestamp: new Date().toISOString()
  });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
  console.log(`📊 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🍔 Endpoint de platillos: http://localhost:${PORT}/api/platillos`);
});
