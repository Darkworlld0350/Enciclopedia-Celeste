const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const nasaController = require('../controllers/nasaController');


const catalogController = require('../controllers/catalogController');
router.get('/', homeController.index);
router.get('/catalogo', catalogController.catalogo);
router.get('/objeto/:id', catalogController.detalleObjeto);
router.get('/nasa', nasaController.buscar);


module.exports = router;
