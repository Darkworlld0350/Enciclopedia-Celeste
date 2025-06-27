const axios = require('axios');
const xml2js = require('xml2js');

exports.buscarSimbad = async (nombreOriginal) => {
  const query = nombreOriginal.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const url = `http://simbad.u-strasbg.fr/simbad/sim-id?Ident=${encodeURIComponent(query)}&output.format=VOTable`;

  try {
    const response = await axios.get(url);
    const xml = response.data;
    const result = await xml2js.parseStringPromise(xml, { mergeAttrs: true });

    // Verificar si hay mensaje de error de SIMBAD
    const infoNode = result.VOTABLE?.INFO?.[0];
    const errorMsg = infoNode?.$.value || infoNode?._;
    if (errorMsg) {
      console.warn(`SIMBAD INFO: ${errorMsg}`);
    }

    // Acceder a las filas de la tabla
    const rows = result.VOTABLE?.RESOURCE?.[0]?.TABLE?.[0]?.DATA?.[0]?.TABLEDATA?.[0]?.TR;
    if (!rows || rows.length === 0) {
      return {
        nombre: nombreOriginal,
        descripcion: 'No se encontraron datos útiles en la respuesta.',
        data: null,
      };
    }

    const tableData = rows[0]?.TD || [];

    // Extraer valores con fallback
    const camposDeseados = {
      Identificador: tableData[3]?.[0] || 'Desconocido',
      Tipo: tableData[4]?.[0] || 'Desconocido',
      DistanciaAngular: (tableData[2]?.[0] || '0') + ' arcsec',
      RA: (tableData[5]?.[0] || '0') + '°',
      DEC: (tableData[6]?.[0] || '0') + '°'
    };

    return {
      nombre: nombreOriginal,
      descripcion: 'Datos obtenidos correctamente desde SIMBAD.',
      data: camposDeseados
    };

  } catch (error) {
    console.error('Error al consultar/parsing SIMBAD:', error.message);
    return {
      nombre: nombreOriginal,
      descripcion: 'Error al obtener datos desde SIMBAD.',
      data: null,
    };
  }
};
