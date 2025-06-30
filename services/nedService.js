const axios = require('axios');
const xml2js = require('xml2js');

/**
 * Busca un objeto astronómico en la base de datos NED (NASA/IPAC Extragalactic Database)
 * @param {string} nombre - Nombre del objeto astronómico a buscar
 * @returns {Promise<Object>} Objeto con los datos encontrados en formato estructurado
 * @throws {Error} Si ocurre un error en la consulta a la API
 */
async function buscarNED(nombre) {
  try {
    // Construye la URL de consulta al servicio NED con formato XML
    const url = `https://ned.ipac.caltech.edu/srs/ObjectLookup?objname=${encodeURIComponent(nombre)}&of=xml_main`;
    const response = await axios.get(url);
    
    // Parsea el XML de respuesta a un objeto JSON
    const parsed = await xml2js.parseStringPromise(response.data, { 
      explicitArray: false // Evita crear arrays para elementos únicos
    });

    // Extrae los datos relevantes usando encadenamiento opcional
    const datos = parsed?.VOTABLE?.RESOURCE?.TABLE?.DATA?.TABLEDATA?.TR;

    // Retorna un objeto estandarizado con los resultados
    return {
      nombre,
      fuente: 'NED',
      datos: datos || 'Sin datos disponibles', // Proporciona valor por defecto
    };
  } catch (error) {
    console.error('NED falló:', error.message);
    throw error; // Relanza el error para manejo externo
  }
}

module.exports = { buscarNED };