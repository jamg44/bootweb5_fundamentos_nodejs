'use strict';

console.log('empiezo');

// funcion que escribe un texto en la consola tras 2 segundos
function escribeTras2Segundos(texto, callBack) {
  setTimeout(() => {
    console.log(texto);
    callBack(55);
  }, 2000);
}

// bucle asíncrono en serie
// llamar a una función asíncrona n veces en serie
function serie(n, funcionQueHayQUeLlamar, callBackFinalizacion) {
  if (n === 0) { // es que he terminado, tengo que salir del bucle
    callBackFinalizacion();
    return;
  }
  n = n - 1;
  funcionQueHayQUeLlamar('texto' + n, () => {
    // cuando termine de esperar los 2 segundos
    serie(n, funcionQueHayQUeLlamar, callBackFinalizacion);
  });
}

// ejecuta escribeTras2Segundos 5 veces y cuando termines llamas el callback
serie(5, escribeTras2Segundos, () => {
  console.log('fin');
});
