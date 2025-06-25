const axios = require('axios');

exports.buscarSimbad = async (nombre) => {
  const encoded = encodeURIComponent(nombre);
  const url = `http://simbad.u-strasbg.fr/simbad/sim-id?Ident=${encoded}&output.format=VOTable`;

  try {
    const response = await axios.get(url);
    return response.data; // ⚠️ aún no parseado
  } catch (error) {
    console.error('Error en SIMBAD:', error.message);
    return null;
  }
};
const axios = require('axios');

exports.buscarSimbad = async (nombre) => {
  const encoded = encodeURIComponent(nombre);
  const url = `http://simbad.u-strasbg.fr/simbad/sim-id?Ident=${encoded}&output.format=VOTable`;

  try {
    const response = await axios.get(url);
    return response.data; // ⚠️ aún no parseado
  } catch (error) {
    console.error('Error en SIMBAD:', error.message);
    return null;
  }
};
