// controllers/nasaController.js
const nasaService = require('../services/nasaService');


exports.buscar = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.render('pages/nasa', { resultados: [], query: '' });
  }

  const resultados = await nasaService.buscarObjetos(q);
  res.render('pages/nasa', { resultados, query: q });
  console.log('Respuesta cruda de SIMBAD:', resultados);

};

