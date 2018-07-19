'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Función que averigua la versión de un módulo instalado localmente
 * @param {string} nombreModulo 
 * @param {Function} callback 
 */
function versionModulo(nombreModulo, callback) {
  // calcular ruta al package.json
  const fichero = path.join(__dirname, 'node_modules', nombreModulo, 'package.json');
  
  // Leer contenido de package.json
  fs.readFile(fichero, (err, datos) => {
    if (err) {
      callback(err); // devolver el error
      return; // evitar que siga la ejecución
    }

    // Parsear contenido
    let packageJson;
    try {
      packageJson = JSON.parse(datos);
    } catch(err) {
      callback(err); // devolver el error
      return; // evitar que siga la ejecución
    }

    // Obtener la versión y devolverla
    callback( null, packageJson.version);

  });


}

versionModulo('chance', (err, version) => {
  // error first
  if (err) {
    console.error('Hubo un error:', err);
    process.exit(1);
  }

  console.log('La versión del módulo es:', version);
});