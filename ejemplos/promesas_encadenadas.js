'use strict';

// funciones que devuelven promesas

function conArroz(plato) {
  return new Promise((resolve, reject) => {
    resolve(plato + ' arroz');
    //reject('zz')
  });
}

function conAjo(plato) {
  return new Promise((resolve, reject) => {
    resolve(plato + ' ajo');
  });
}

async function conMasAjo(plato) {
  // si aquí lanzo una excepción, hara reject con la excepción 
  return plato + ' ajo';
}

function con(plato, ingrediente) {
  return new Promise((resolve, reject) => {
    resolve(plato + ' ' + ingrediente);
  });
}

// ecadenar la ejecución de las funciones
const paella = 'paella con';

conArroz(paella)
  .then(conAjo)
  .then(conMasAjo)
  .then(plato => con(plato, 'marisco') )
  .then(plato => { console.log(plato); })
  .catch(err => {
    console.log('Hubo un error', err);
  });
