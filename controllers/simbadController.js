const { buscarSimbad } = require('../services/simbadService');

exports.verCientifico = async (req, res) => {
  const nombre = req.params.nombre;
  const datos = await buscarSimbad(nombre);

  if (!datos) {
    return res.status(500).send('No se pudieron obtener los datos científicos');
  }

  res.render('pages/detalle-cientifico', { datos });
};
