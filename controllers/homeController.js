const { buscarObjetos } = require('../services/nasaService');

// Controlador principal - Muestra objetos con opción de búsqueda
exports.index = async (req, res) => {
  const query = req.query.nombre || ''; // Término de búsqueda o vacío
  const objetos = await buscarObjetos(query); // Obtiene resultados
  res.render('pages/index', { objetos }); // Renderiza vista con datos
};