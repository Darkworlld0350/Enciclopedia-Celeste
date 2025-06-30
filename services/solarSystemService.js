// services/solarSystemService.js
const axios = require('axios');

const BASE_URL = 'https://api.le-systeme-solaire.net/rest/bodies';

exports.obtenerTodosLosCuerpos = async () => {
  try {
    const res = await axios.get(BASE_URL);
    return res.data.bodies;
  } catch (error) {
    console.error('Error al obtener cuerpos celestes:', error.message);
    return [];
  }
};

exports.buscarPorIdSolar = async (id) => {
  try {
    const res = await axio// services/solarSystemService.js
const axios = require('axios');

// URL base de la API del Sistema Solar
const BASE_URL = 'https://api.le-systeme-solaire.net/rest/bodies';

/**
 * Obtiene todos los cuerpos celestes del sistema solar
 * @returns {Promise<Array>} Lista de objetos astronómicos
 */
exports.obtenerTodosLosCuerpos = async () => {
  try {
    const res = await axios.get(BASE_URL);
    return res.data.bodies; // Extrae el array de cuerpos de la respuesta
  } catch (error) {
    console.error('Error al obtener cuerpos celestes:', error.message);
    return []; // Devuelve array vacío en caso de error
  }
};

/**
 * Busca un cuerpo celeste por su ID en el sistema solar
 * @param {string} id - Identificador del cuerpo (ej: "earth", "mars")
 * @returns {Promise<Object|null>} Datos del cuerpo celeste o null si no se encuentra
 */
exports.buscarPorIdSolar = async (id) => {
  try {
    // Normaliza el ID a minúsculas para evitar problemas de case-sensitivity
    const res = await axios.get(`${BASE_URL}/${id.toLowerCase()}`); 
    return res.data; // Devuelve los datos completos del cuerpo
  } catch (error) {
    console.warn('Solar API falló:', error.message); // Usa warn en lugar de error
    return null; // Devuelve null explícito para indicar "no encontrado"
  }
};s.get(`${BASE_URL}/${id.toLowerCase()}`);
    return res.data;
  } catch (error) {
    console.warn('Solar API falló:', error.message);
    return null;
  }
};
