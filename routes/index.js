const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const nasaController = require('../controllers/nasaController');
const catalogController = require('../controllers/catalogController');
const nedController = require('../controllers/nedController');



router.get('/', homeController.index);
router.get('/catalogo', catalogController.catalogo);
router.get('/objeto/:id', catalogController.detalleObjeto);
router.get('/nasa', nasaController.buscar);
router.get('/cientifico/:nombre', nedController.verCientifico);



module.exports = router;
