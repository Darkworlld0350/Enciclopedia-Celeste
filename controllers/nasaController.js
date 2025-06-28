const { buscarObjetos } = require('../services/nasaService');

exports.buscar = async (req, res) => {
  const query = req.query.q;
  if (!query) return res.render('pages/nasa', { resultados: null, query: '' });

  const resultados = await buscarObjetos(query);
  res.render('pages/nasa', { resultados, query });
};
