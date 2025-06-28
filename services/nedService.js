const { buscarNED } = require('./nedService');
const { buscarSIMBAD } = require('./simbadService');
const axios = require('axios');

exports.obtenerDatosCientificos = async (nombreOriginal) => {
  // 1. NED
  const ned = await buscarNED(nombreOriginal);
  if (ned?.data) return ned;

  // 2. le-systeme-solaire.net
  try {
    const { data } = await axios.get(`https://api.le-systeme-solaire.net/rest/bodies/${nombreOriginal.toLowerCase()}`);
    if (data?.englishName) {
      return {
        nombre: data.englishName,
        descripcion: 'Datos obtenidos desde le-systeme-solaire.net.',
        data: {
          Nombre: data.englishName,
          Masa: data.mass?.massValue ? `${data.mass.massValue} x10^${data.mass.massExponent} kg` : 'N/A',
          Densidad: data.density || 'N/A',
          Gravedad: data.gravity ? `${data.gravity} m/s²` : 'N/A',
          Radio: data.meanRadius ? `${data.meanRadius} km` : 'N/A',
        }
      };
    }
  } catch (error) {
    console.error('Error desde sistema solar API:', error.message);
  }

  // 3. SIMBAD
  const simbad = await buscarSIMBAD(nombreOriginal);
  if (simbad?.data) return simbad;

  // Sin resultados
  return {
    nombre: nombreOriginal,
    descripcion: 'No se pudo obtener información científica desde NED, sistema-solaire ni SIMBAD.',
    data: null,
  };
};
