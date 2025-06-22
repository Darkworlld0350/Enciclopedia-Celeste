const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.index);

const catalogController = require('../controllers/catalogController');
router.get('/catalogo', catalogController.catalogo);
router.get('/objeto/:id', catalogController.detalleObjeto);


module.exports = router;
