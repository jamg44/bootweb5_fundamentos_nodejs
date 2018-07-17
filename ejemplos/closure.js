'use strict';

// partrón factory
function creaAgente(nombre) {
  let edad = 20;
  return {
    getNombre: function() {
      return nombre;
    },
    getEdad: function() {
      return edad;
    },
    saluda: function() {
      console.log('Hola soy', nombre, 'y tengo', edad, 'años');
    }
  }
}

const jones = creaAgente('Jones');

jones.saluda();

const brown = creaAgente('Brown');
brown.saluda();

setTimeout(jones.saluda, 2000);
console.log(jones);
