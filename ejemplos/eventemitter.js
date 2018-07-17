'use strict';

const EventEmitter = require('events');

// creamos un emisor de evnetos
const emisor = new EventEmitter();

// suscribirnos a eventos
emisor.on('llamada telefono', (opciones) => {
  if (opciones.nombre === 'madre') {
    return;
  } 
  console.log('ring ring');
});

emisor.once('llamada telefono', () => {
  console.log('brr brr');
});

// emitir eventos
emisor.emit('llamada telefono', { nombre: 'madre' });

