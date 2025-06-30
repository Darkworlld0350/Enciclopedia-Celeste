const { buscarSIMBAD } = require('../services/buscarNed');

// Obtiene y muestra datos científicos de un objeto astronómico
exports.verCientifico = async (req, res) => {
  const nombre = req.params.nombre;  // Nombre del objeto a buscar
  
  const datos = await buscarSIMBAD(nombre);  // Consulta servicio SIMBAD

  if (!datos) {  // Si no hay datos
    return res.status(500).send('No se pudieron obtener los datos científicos');
  }

  res.render('pages/detalle-cientifico', { datos });  // Muestra vista con datos
};