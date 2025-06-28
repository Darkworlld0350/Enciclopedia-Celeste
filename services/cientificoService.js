const { buscarNED } = require('./nedService');
const { buscarSimbad } = require('./simbadService');
const axios = require('axios');

exports.obtenerDatosCientificos = async (nombreOriginal) => {
  // 1. Intentar con SIMBAD
  try {
    const simbad = await buscarSimbad(nombreOriginal);
    if (simbad?.data) {
      return simbad;
    }
  } catch (error) {
    console.warn('SIMBAD falló:', error.message);
  }

  // 2. Intentar con NED
  try {
    const ned = await buscarNED(nombreOriginal);
    if (ned?.data) {
      return ned;
    }
  } catch (error) {
    console.warn('NED falló:', error.message);
  }

  // 3. Respaldo: le-systeme-solaire.net
  try {
    const { data } = await axios.get(`https://api.le-systeme-solaire.net/rest/bodies/${nombreOriginal.toLowerCase()}`);
    if (data && data.englishName) {
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
    console.warn('Error desde sistema solar API:', error.message);
  }

  // Si todas fallan
  return {
    nombre: nombreOriginal,
    descripcion: 'No se pudo obtener información científica desde SIMBAD, NED ni sistema-solaire.',
    data: null,
  };
};
