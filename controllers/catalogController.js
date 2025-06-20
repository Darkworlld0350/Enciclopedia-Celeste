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

  res.render('pages/catalogo', { objetos });
};
