const { buscarObjetos } = require('../services/nasaService');

// Controlador de búsqueda - Devuelve resultados o null si no hay query
exports.buscar = async (req, res) => {
  const query = req.query.q; // Obtiene término de búsqueda
  
  // Si no hay query, renderiza sin resultados
  if (!query) return res.render('pages/nasa', { resultados: null, query: '' });
  
  // Busca objetos y renderiza resultados
  const resultados = await buscarObjetos(query);
  res.render('pages/nasa', { resultados, query });
};