'use strict';

const calculadora = require('./calculadora');
const calculadora2 = require('./calculadora'); // obtengo el mismo objeto que se exportó antes

console.log(calculadora.suma(2, 5));