/**
 * Controlador principal para el catálogo de objetos astronómicos
 * Maneja las vistas de catálogo, detalles y datos científicos
 */

// Importación de servicios
const { buscarObjetos } = require('../services/nasaService');        // Servicio para datos de la NASA
const { obtenerTodosLosCuerpos } = require('../services/solarSystemService'); // Servicio del sistema solar
const { buscarObjetoPorNombre } = require('../services/cientificoService');  // Servicio de datos científicos

/**
 * Muestra el catálogo completo con capacidad de filtrado
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 */
exports.catalogo = async (req, res) => {
  // Obtener parámetro de filtro tipo desde la query string
  const { tipo } = req.query;
  
  // Obtener todos los cuerpos celestes del sistema solar
  let cuerpos = await obtenerTodosLosCuerpos();

  // Aplicar filtro por tipo si se especificó
  if (tipo) {
    cuerpos = cuerpos.filter(c => c.bodyType.toLowerCase() === tipo.toLowerCase());
  }

  // Mapear los datos a un formato más simple para la vista
  const objetos = cuerpos
    .filter(c => c.englishName)  // Filtrar solo los que tienen nombre
    .map(c => ({
      id: c.id,
      nombre: c.englishName,     // Nombre en inglés
      tipo: c.bodyType,          // Tipo de cuerpo celeste
      masa: c.mass?.massValue,   // Valor de masa (opcional)
      gravedad: c.gravity,       // Gravedad en la superficie
      imagen: `/img/default-space.jpg` // Imagen por defecto
    }));

  // Renderizar vista de catálogo con los datos
  res.render('pages/catalog', {
    objetos,
    filtros: req.query,  // Pasar todos los parámetros de filtro a la vista
  });
};

/**
 * Muestra el detalle visual de un objeto (imagen + descripción)
 * @param {Object} req - Objeto de solicitud con ID en params
 * @param {Object} res - Objeto de respuesta HTTP
 */
exports.detalleObjeto = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar objeto por ID reutilizando función de búsqueda
    const resultados = await buscarObjetos(id);
    const objeto = resultados.find((o) => o.id === id);

    // Validar si se encontró el objeto
    if (!objeto) {
      return res.status(404).send('Objeto no encontrado');
    }

    // Renderizar vista de detalle con datos formateados
    res.render('pages/detalle', {
      detalle: {
        id: objeto.id,
        nombre: objeto.title || objeto.nombre || objeto.id, // Nombre con fallbacks
        imagenes: [objeto.imagen], // Array de imágenes (solo 1 en este caso)
        descripcion: objeto.descripcion || 'Sin descripción disponible', // Descripción con valor por defecto
      },
    });
  } catch (error) {
    // Manejo de errores
    console.error('Error al obtener detalle:', error.message);
    res.status(500).send('Error al obtener el detalle');
  }
};

/**
 * Muestra el detalle científico con datos técnicos de un objeto
 * @param {Object} req - Objeto de solicitud con nombre en params
 * @param {Object} res - Objeto de respuesta HTTP
 */
exports.detalleCientifico = async (req, res) => {
  const nombre = req.params.nombre;
  
  // Buscar datos científicos por nombre exacto
  const data = await buscarObjetoPorNombre(nombre);

  console.log('Datos científicos obtenidos:', data);

  // Validar si se encontraron datos
  if (!data) {
    return res.status(404).send('Objeto no encontrado');
  }

  // Renderizar vista de detalle científico
  res.render('pages/detalle-cientifico', { data });
};

/**
 * Vista alternativa de detalle (parece duplicada - considerar eliminar si no se usa)
 * @param {Object} req - Objeto de solicitud con ID en params
 * @param {Object} res - Objeto de respuesta HTTP
 */
exports.verDetalle = async (req, res) => {
  const id = req.params.id;
  
  // Buscar todos los objetos (poco eficiente - considerar optimizar)
  const resultados = await buscarObjetos('');

  // Encontrar el objeto específico
  const objeto = resultados.find(o => o.id === id);

  // Manejar caso de no encontrado
  if (!objeto) {
    return res.render('pages/404', { mensaje: 'Objeto no encontrado' });
  }

  // Renderizar vista de detalle (similar a detalleObjeto)
  res.render('pages/detalle', {
    detalle: {
      id: objeto.id,
      nombre: objeto.title || objeto.nombre || objeto.id,
      imagenes: [objeto.imagen],
      descripcion: objeto.descripcion || 'Sin descripción disponible',
    }
  });
};