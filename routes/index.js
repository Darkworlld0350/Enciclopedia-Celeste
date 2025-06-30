const express = require('express');
const router = express.Router();

// Importación de controladores
const homeController = require('../controllers/homeController');
const nasaController = require('../controllers/nasaController');
const catalogController = require('../controllers/catalogController');
const nedController = require('../controllers/nedController');

// Definición de rutas
router.get('/', homeController.index); // Ruta principal
router.get('/catalogo', homeController.index); // Alias de ruta principal
router.get('/catalogo/:id', catalogController.detalleObjeto); // Detalle de objeto específico
router.get('/nasa', nasaController.buscar); // Búsqueda en datos NASA
router.get('/cientifico/:nombre', nedController.verCientifico); // Datos científicos

module.exports = router;