const axios = require('axios');
const xml2js = require('xml2js');

// URLs base para APIs astronómicas
const BASE_NED_URL = 'https://ned.ipac.caltech.edu/cgi-bin/objsearch?of=xml&id=';
const BASE_SOL_URL = 'https://api.le-systeme-solaire.net/rest/bodies/';

/**
 * Busca un objeto astronómico por nombre en múltiples fuentes
 * @param {string} nombre - Nombre del objeto a buscar
 * @returns {Object|null} Datos del objeto o null si no se encuentra
 */
async function buscarObjetoPorNombre(nombre) {
  const normalizado = nombre.trim().toLowerCase();

  // 1. Intento con NED (NASA/IPAC Extragalactic Database)
  try {
    const nedRes = await axios.get(`${BASE_NED_URL}${encodeURIComponent(nombre)}`);
    const parsed = await xml2js.parseStringPromise(nedRes.data, { explicitArray: false });

    if (parsed?.Resource?.Results?.Result) {
      const node = parsed.Resource.Results.Result;
      return {
        fuente: 'NED',
        nombre: node.Name || nombre,
        tipo: node.Type || 'Desconocido',
        redshift: node.Redshift || 'No disponible',
        notas: node.Notes || '',
        referencias: node?.Reference?.length || 0
      };
    }
  } catch (err) {
    console.warn('Error en NED:', err.message);
  }

  // 2. Fallback a Solar System API
  try {
    const solRes = await axios.get(`${BASE_SOL_URL}${normalizado}`);
    const body = solRes.data;

    if (body?.englishName) {
      return {
        fuente: 'le-systeme-solaire.net',
        nombre: body.englishName || nombre,
        tipo: body.bodyType || 'Desconocido',
        masa: body.mass?.massValue ? `${body.mass.massValue} x10^${body.mass.massExponent} kg` : 'No disponible',
        densidad: body.density ?? 'No disponible',
        gravedad: body.gravity ? `${body.gravity} m/s²` : 'No disponible',
        radio: body.meanRadius ? `${body.meanRadius} km` : 'No disponible',
        lunaCantidad: body.moons?.length || 0
      };
    }
  } catch (err) {
    console.warn('Error en Solar API:', err.message);
  }

  // 3. Si todas las fuentes fallan
  return null;
}

module.exports = { buscarObjetoPorNombre };