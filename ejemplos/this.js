'use strict';

// constructor de objetos
function Coche(ruedas) {
  this.ruedas = ruedas;

  this.cuantasRuedas = function() {
    // el uso de this en métodos depende de como se use el método
    console.log('tiene', this.ruedas, 'ruedas');
  }
}

const todoterreno = new Coche(4);

//todoterreno.cuantasRuedas();

// con .bind asigno un this permanente a la función
setTimeout(todoterreno.cuantasRuedas.bind(todoterreno), 2000);

/*
const numRuedas = todoterreno.cuantasRuedas;
// si no hay nada a la izquierda del punto de la ejecución, this será undefined
numRuedas();
*/