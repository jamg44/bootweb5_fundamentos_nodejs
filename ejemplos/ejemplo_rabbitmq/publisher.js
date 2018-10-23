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

  let sendAgain = true;

  setInterval(async () => {
    const mensaje = {
      workToDo: 'la tarea de ' + Date.now()
    };

    if (!sendAgain) {
      console.log('Esperando a evento drain...');
      await new Promise(resolve => channel.on('drain', resolve));
    }

    // mandar un mensaje
    sendAgain = channel.sendToQueue(queueName, Buffer.from( JSON.stringify(mensaje) ), {
      persistent: true // el mensaje sobrevive a reinicios
    });

    console.log(`publicado ${mensaje.workToDo} ${sendAgain}`);

  }, 10);

})().catch(err => console.log('Hubo un error', err));
