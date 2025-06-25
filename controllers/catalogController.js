const { buscarObjetos } = require('../services/nasaService');

exports.catalogo = async (req, res) => {
  const objetosLocales = [

    {
      id: 1,
      nombre: 'Betelgeuse',
      tipo: 'Estrella',
      magnitud: 0.42,
      distancia: 642,
      imagen: '/img/betelgeuse.jpg',
    },
    {
      id: 2,
      nombre: 'Júpiter',
      tipo: 'Planeta',
      distancia: 5.2,
      imagen: '/img/jupiter.jpg',
    },
    {
      id: 3,
      nombre: 'Andrómeda',
      tipo: 'Galaxia',
      distancia: 2537000,
      imagen: '/img/andromeda.jpg',
    },
  ];

  const { nombre, tipo, magnitud, externo } = req.query;
  let objetos = objetosLocales;

  // Si la búsqueda externa está activada
  if (externo && nombre) {
    objetos = await buscarObjetos(nombre);
    return res.render('pages/catalog', {
      objetos,
      filtros: req.query,
      externo: true,
    });
  }

  // Filtros locales
  if (nombre) {
    objetos = objetos.filter(o =>
      o.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
  }
  if (tipo && tipo !== 'Todos') {
    objetos = objetos.filter(o => o.tipo === tipo);
  }
  if (magnitud) {
    objetos = objetos.filter(o => o.magnitud && o.magnitud <= parseFloat(magnitud));
  }

  res.render('pages/catalog', { objetos, filtros: req.query, externo: false });
};

//objeto
exports.detalleObjeto = (req, res) => {
  const { id } = req.params;

  const objetosLocales = [
    {
      id: 1,
      nombre: 'Betelgeuse',
      tipo: 'Estrella',
      magnitud: 0.42,
      distancia: 642,
      imagen: '/img/betelgeuse.jpg',
    },
    {
      id: 2,
      nombre: 'Júpiter',
      tipo: 'Planeta',
      distancia: 5.2,
      imagen: '/img/jupiter.jpg',
    },
    {
      id: 3,
      nombre: 'Andrómeda',
      tipo: 'Galaxia',
      distancia: 2537000,
      imagen: '/img/andromeda.jpg',
    },
  ];

  const objeto = objetosLocales.find(o => o.id == id);

  if (!objeto) {
    return res.status(404).send('Objeto no encontrado');
  }

  res.render('pages/detalle', { objeto });
};