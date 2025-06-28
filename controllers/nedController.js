const { obtenerDatosCientificos } = require('../services/cientificoService');

exports.verCientifico = async (req, res) => {
  const nombre = req.params.nombre;

  try {
    const datos = await obtenerDatosCientificos(nombre);
    res.render('pages/detalle-cientifico', { datos });
  } catch (error) {
    console.error('Error al obtener datos científicos:', error.message);
    res.render('pages/detalle-cientifico', {
      datos: {
        nombre,
        descripcion: 'Error al obtener datos científicos.',
        data: null
      }
    });
  }
};
