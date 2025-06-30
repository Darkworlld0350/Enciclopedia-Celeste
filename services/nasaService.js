const axios = require('axios');

/**
 * Busca objetos astronómicos en la API de NASA Images
 * @param {string} query - Término de búsqueda (ej: "galaxy", "nebula")
 * @returns {Promise<Array>} Lista de objetos encontrados con sus metadatos
 */
exports.buscarObjetos = async (query) => {
  try {
    // Construye la URL de búsqueda con el query codificado para URL
    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`;
    const response = await axios.get(url);
    
    // Logs de depuración (pueden removerse en producción)
    console.log('Items:', response.data.collection.items.length); // <- Verifica que haya resultados
    console.log('✅ Resultado crudo de NASA API:', JSON.stringify(response.data, null, 2)); // 👈

    // Mapea los resultados a un formato más limpio y estructurado
    const objetos = response.data.collection.items.map((item) => ({
      id: item.data?.[0]?.nasa_id || 'sin-id',               // ID único de NASA
      nombre: item.data?.[0]?.title || 'Sin título',         // Título del objeto
      descripcion: item.data?.[0]?.description || 'Sin descripción', // Descripción
      tipo: item.data?.[0]?.keywords?.[0] || 'Desconocido',  // Primera palabra clave
      imagen: item.links?.[0]?.href || '',                   // URL de la imagen
    }));

    return objetos;
  } catch (error) {
    // Manejo de errores: loguea el error y devuelve array vacío
    console.error('Error al consultar la API de NASA:', error.message);
    return [];
  }
};