'use strict';

const connectionPromise = require('./connectAMQP');

const queueName = 'tareas';

// IIFE - Inmediatelly Invoked Function Expression
(async () => {
  
  // nos aseguramos de estar conectados
  const conn = await connectionPromise;

  // conectar a un canal
  const channel = await conn.createChannel();

  // conectar a una cola
  await channel.assertQueue(queueName, {
    durable: true // la cola sobrevive a reinicios del broker
  });

  setInterval(() => {

    const mensaje = {
      workToDo: 'la tarea de ' + Date.now()
    };

    // mandar un mensaje
    const result = channel.sendToQueue(queueName, Buffer.from( JSON.stringify(mensaje) ), {
      persistent: true // el mensaje sobrevive a reinicios
    });

    console.log(`publicado ${mensaje.workToDo} ${result}`);

  }, 100);

})().catch(err => console.log('Hubo un error', err));
