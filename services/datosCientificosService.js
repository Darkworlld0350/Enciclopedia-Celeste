const { buscarNED } = require('./nedService');
const { buscarSimbad } = require('./simbadService');
const axios = require('axios');

/**
 * Obtiene datos científicos de un objeto astronómico desde múltiples fuentes
 * @param {string} nombre - Nombre del objeto a buscar
 * @returns {Promise<Object>} Datos del objeto con información de la fuente
 */
async function obtenerDatosCientificos(nombre) {
  // Intenta primero con NED (NASA/IPAC Extragalactic Database)
  try {
    const ned = await buscarNED(nombre);
    return ned;
  } catch {} // Si falla, continúa silenciosamente a la siguiente fuente

  // Si NED falla, intenta con SIMBAD (Set of Identifications, Measurements)
  try {
    const simbad = await buscarSimbad(nombre);
    return simbad;
  } catch {} // Si falla, pasa a la última fuente

  // Último recurso: API del Sistema Solar
  try {
    // Prepara el nombre para la URL (formato slug)
    const slug = nombre.trim().toLowerCase().replace(/\s+/g, '-');
    const response = await axios.get(`https://api.le-systeme-solaire.net/rest/bodies/${slug}`);

    // Estructura de respuesta estandarizada
    return {
      nombre: response.data.englishName || nombre, // Usa el nombre de la API o el original
      fuente: 'Sistema Solar API',
      datos: response.data,
    };
  } catch (error) {
    // Si todo falla, devuelve un objeto con valores por defecto
    console.error('❌ Respaldo falló:', error.message);
    return {
      nombre,
      fuente: 'Ninguna fuente',
      datos: 'Sin datos disponibles',
    };
  }
}

module.exports = { obtenerDatosCientificos };