'use strict';

console.log('empiezo');

// funcion que escribe un texto en la consola tras 2 segundos
function escribeTras2Segundos(texto, callBack) {
  setTimeout(() => {
    console.log(texto);
    callBack(55);
  }, 2000);
}

escribeTras2Segundos('texto1', (res) => {
  escribeTras2Segundos('texto2', (res) => {
    console.log('fin');
  });
});
