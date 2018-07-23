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
    //reject(new Error('fatal'));
  });
}

async function conMasAjo(plato) {
  // si aquí lanzo una excepción, hara reject con la excepción 
  //const row = await db.query(sql);

  await new Promise(r => setTimeout(r, 100)); // usar una función de callback con await

  return plato + ' ajo';
}

function con(plato, ingrediente) {
  return new Promise((resolve, reject) => {
    resolve(plato + ' ' + ingrediente);
  });
}

// ecadenar la ejecución de las funciones
const paella = 'paella con';

// para usar await tiene que ser dentro de una función con async
// IIFE (Inmediatelly Invoked Function Expression)
(async () => {
  // puedo usar await
  let plato = await conArroz(paella);
  plato = await conAjo(plato);
  for(let i = 0; i < 100; i++) {
    plato = await conMasAjo(plato);
  }
  plato = await con(plato, 'pollo');
  console.log(plato);
})().catch(err => console.error('Hubo un error', err));
