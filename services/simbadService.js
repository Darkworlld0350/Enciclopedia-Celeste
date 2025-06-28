const axios = require('axios');
const xml2js = require('xml2js');

exports.buscarSIMBAD = async (nombreOriginal) => {
  const query = nombreOriginal.trim();

  try {
    const response = await axios.get(`https://simbad.u-strasbg.fr/simbad/sim-id`, {
      params: {
        Ident: query,
        'output.format': 'VOTable'
      }
    });

    const result = await xml2js.parseStringPromise(response.data, { mergeAttrs: true });

    const data = result?.VOTABLE?.RESOURCE?.[0]?.TABLE?.[0]?.DATA?.[0]?.TABLEDATA?.[0]?.TR?.[0]?.TD;
    if (!data || data.length < 4) {
      return null;
    }

    return {
      nombre: query,
      descripcion: 'Datos obtenidos desde SIMBAD.',
      data: {
        Identificador: data[0] || 'N/A',
        Coordenadas_RA: data[1] || 'N/A',
        Coordenadas_DEC: data[2] || 'N/A',
        Tipo: data[3] || 'N/A',
      }
    };
  } catch (error) {
    console.error('Error al consultar/parsing SIMBAD:', error.message);
    return null;
  }
};
