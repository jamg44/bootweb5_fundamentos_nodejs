'use strict';

// definimos una función constructora de objetos
function Persona(nombre) {
  this.nombre = nombre;

  /*this.saluda = function() {
    console.log('Hola, me llamo', this.nombre);
  }*/
}

// construir un objeto
const luis = new Persona('Luis');

Persona.prototype.saluda = function() {
  console.log('Hola, me llamo', this.nombre);
}

luis.saluda();

// Herencia de persona --------------------------------

function Agente(nombre) {
  // ejecutar el constructor de Persona con mi propio this
  Persona.call(this, nombre);
}

// heredar propiedades y métodos
Agente.prototype = new Persona('soy un prototipo');

//Agente.prototype = Persona.prototype;

const smith = new Agente('Smith');

Agente.prototype.dispara = function() {
  //...
}

smith.saluda();

// Herencia múltiple

function Superheroe() {
  this.vuela = function() {
    console.log(this.nombre, 'vuela');
  }
  this.esquivaBalas = function() {
    console.log(this.nombre, 'esquiva balas');
  }
}

// los agentes van a heredar tanto de las personas como de los superheroes
Agente.prototype = Object.assign(Agente.prototype, new Superheroe());

smith.esquivaBalas();
smith.vuela();
