const axios = require('axios');
const xml2js = require('xml2js');

/**
 * Consulta el objeto astronómico en la base de datos SIMBAD
 * @param {string} nombre - Nombre o identificador del objeto celeste
 * @returns {Promise<Object>} Objeto con datos estructurados del objeto astronómico
 * @throws {Error} Cuando falla la consulta al servicio SIMBAD
 */
async function buscarSimbad(nombre) {
  try {
    // Construye URL para consultar SIMBAD en formato VOTable (XML astronómico estándar)
    const url = `https://simbad.u-strasbg.fr/simbad/sim-id?Ident=${encodeURIComponent(nombre)}&output.format=VOTable`;
    const response = await axios.get(url);

    // Parsea el XML de respuesta a objeto JavaScript
    const parsed = await xml2js.parseStringPromise(response.data, { 
      explicitArray: false // Optimiza para objetos simples (no arrays)
    });

    // Extrae los datos usando encadenamiento opcional para evitar errores
    const datos = parsed?.VOTABLE?.RESOURCE?.TABLE?.DATA?.TABLEDATA?.TR;

    // Retorna objeto estandarizado con la respuesta
    return {
      nombre,
      fuente: 'SIMBAD', // Identifica claramente la fuente de los datos
      datos: datos || 'Sin datos disponibles', // Fallback para respuestas vacías
    };
  } catch (error) {
    // Log del error con emoji para mejor visibilidad en consola
    console.error('❌ SIMBAD falló:', error.message); 
    throw error; // Propaga el error para manejo externo
  }
}

module.exports = { buscarSimbad };