'use strict';

const async = require('async');

console.log('empiezo');

// funcion que escribe un texto en la consola tras 2 segundos
function escribeTras2Segundos(texto, callBack) {
  setTimeout(() => {
    console.log(texto);
    callBack(null, 55);
  }, 2000);
}

// bucle asíncrono en serie
// llamar a una función asíncrona en serie con una colección
function serie(arr, funcionQueHayQUeLlamar, callBackFinalizacion) {
  if (arr.length == 0) { // es que he terminado, tengo que salir del bucle
    callBackFinalizacion();
    return;
  }
  funcionQueHayQUeLlamar('texto' + arr.shift(), () => {
    // cuando termine de esperar los 2 segundos
    serie(arr, funcionQueHayQUeLlamar, callBackFinalizacion);
  });
}

// ejecuta escribeTras2Segundos 5 veces y cuando termines llamas el callback
/*serie([1, 2, 'tres', 4, 5], escribeTras2Segundos, () => {
  console.log('fin');
});*/

async.concatSeries([1, 2, 'tres', 4, 5], escribeTras2Segundos, (err, resultados) => {
  if (err) {
    console.log('Hubo un error', err);
  }
  console.log('fin');
});
