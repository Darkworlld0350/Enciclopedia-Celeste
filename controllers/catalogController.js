// controllers/catalogController.js

exports.catalogo = (req, res) => {
  const objetos = [
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
      imagen: '/img/jupiter.png',
    },
    {
      id: 3,
      nombre: 'Andrómeda',
      tipo: 'Galaxia',
      distancia: 2537000,
      imagen: '/img/andromeda.jpg',
    },
  ];

  // ✅ Este bloque debe ir dentro de la función
  const { nombre, tipo, magnitud } = req.query;

  let filtrados = objetos;

  if (nombre) {
    filtrados = filtrados.filter(o =>
      o.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
  }

  if (tipo && tipo !== 'Todos') {
    filtrados = filtrados.filter(o => o.tipo === tipo);
  }

  if (magnitud) {
    filtrados = filtrados.filter(o => o.magnitud && o.magnitud <= parseFloat(magnitud));
  }

  res.render('pages/catalog', { objetos: filtrados, filtros: req.query });
};

exports.detalleObjeto = (req, res) => {
  const id = parseInt(req.params.id);

  const objetos = [
    {
      id: 1,
      nombre: 'Betelgeuse',
      tipo: 'Estrella',
      magnitud: 0.42,
      distancia: 642,
      composicion: 'Hidrógeno y helio con trazas de elementos más pesados',
      historia: 'Betelgeuse forma parte de la constelación de Orión y ha sido venerada desde la antigüedad.',
      observacion: 'Puede observarse a simple vista en cielos oscuros, especialmente en invierno.',
      enlace: 'https://es.wikipedia.org/wiki/Betelgeuse',
      imagen: '/img/betelgeuse.jpg',
    },
    {
      id: 2,
      nombre: 'Júpiter',
      tipo: 'Planeta',
      distancia: 5.2,
      composicion: 'Gas gigante compuesto de hidrógeno y helio',
      historia: 'Nombrado por el dios romano Júpiter.',
      observacion: 'Visible a simple vista; telescopios permiten ver bandas y lunas.',
      enlace: 'https://es.wikipedia.org/wiki/J%C3%BApiter_(planeta)',
      imagen: '/img/jupiter.jpg',
    },
    {
      id: 3,
      nombre: 'Andrómeda',
      tipo: 'Galaxia',
      distancia: 2537000,
      composicion: 'Estrellas, gas y polvo interestelar',
      historia: 'Nombrada por la princesa de la mitología griega.',
      observacion: 'Visible con binoculares en cielos oscuros.',
      enlace: 'https://es.wikipedia.org/wiki/Galaxia_de_Andr%C3%B3meda',
      imagen: '/img/andromeda.jpg',
    },
  ];

  const objeto = objetos.find(o => o.id === id);
  if (!objeto) {
    return res.status(404).send('Objeto no encontrado');
  }

  res.render('pages/detalle', { objeto });
};
