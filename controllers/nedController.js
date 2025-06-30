const { buscarPorIdSolar } = require('../services/solarSystemService');
const { buscarNED } = require('../services/nedService');
const { buscarSimbad } = require('../services/simbadService');

// Busca datos científicos de un objeto por nombre en múltiples fuentes
exports.verCientifico = async (req, res) => {
  const nombre = req.params.nombre;

  try {
    // Consulta paralela a 3 servicios astronómicos
    const resultados = await Promise.all([
      buscarNED(nombre),
      buscarSimbad(nombre),
      buscarPorIdSolar(nombre)
    ]);

    // Toma el primer resultado válido encontrado
    const data = resultados.find(d => d !== null);

    if (!data) {
      return res.status(404).render('pages/404'); // Objeto no encontrado
    }

    res.render('pages/detalle-cientifico', { data }); // Muestra datos científicos
  } catch (err) {
    console.error('Error en verCientifico:', err.message);
    res.status(500).send('Error interno'); // Manejo de errores
  }
};