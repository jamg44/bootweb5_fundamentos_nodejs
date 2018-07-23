'use strict';

// función que retorna una promesa
function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(56);
      //reject(new Error('fatal'));
    }, ms);
  });
}

const promesa = sleep(0);

console.log(promesa);

promesa.then(valor => { // cuando se resuelva, ejecuta esta función
  console.log('la promesa se completó con', valor);
  // aunque pongamos el .then a una promesa completada también se ejecuta
  promesa.then(() => { console.log('otro then')});
}).catch((err) => { // en el caso de que la promesa haga reject, ejecuta esta función
  console.log('promesa rechazada', err);
  return sleep(5000);
}).then(() => {console.log('lo siguiente')})
  .catch(err => {
    console.log('falló otra vez');
  });;
