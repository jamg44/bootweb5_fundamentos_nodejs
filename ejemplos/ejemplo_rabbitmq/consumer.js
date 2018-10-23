'use strict';

const connectionPromise = require('./connectAMQP');

const queueName = 'tareas';

(async () => {

  const conn = await connectionPromise;

  const channel = await conn.createChannel();

  await channel.assertQueue(queueName, {
    durable: true
  });

  // le decimos al canal 
  // cuantos mensajes quiero procesar
  // en paralelo
  channel.prefetch(1);

  channel.consume(queueName, msg => {
    console.log(msg.content.toString());

    setTimeout(() => { // simulamos que tarda 100ms
      // cuando hemos terminado de procesar el mensaje
      // confirmamos a rabbit que está procesado
      channel.ack(msg);
    }, 10);
  })

})().catch(err => console.log(err));
