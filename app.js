const express = require('express');
const path = require('path');
const app = express();

// Motor de plantillas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public')); // Para servir imágenes desde /img


// Rutas
const mainRoutes = require('./routes/index');
app.use('/', mainRoutes);

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
