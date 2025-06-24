// services/nasaService.js
const axios = require('axios');

exports.buscarObjetos = async (query) => {
  try {
    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`;
    const response = await axios.get(url);
    
    // Extraer solo los datos necesarios
    const objetos = response.data.collection.items.map(item => ({
      id: item.data[0].nasa_id,
      nombre: item.data[0].title,
      descripcion: item.data[0].description,
      imagen: item.links ? item.links[0].href : '',
    }));

    return objetos;
  } catch (error) {
    console.error('Error al consultar la API de NASA:', error.message);
    return [];
  }
};
