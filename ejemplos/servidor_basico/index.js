// cargamos librería http
const http = require('http');
const Chance = require('chance');

const chance = new Chance();

// definir un servidor
const server = http.createServer((request, response) => {
  response.writeHead(200, {'Content-type': 'text/html'});
  response.end(`Wake up, <b>${chance.name()}</b>`);
});

// arrancar el servidor
server.listen(1337, '127.0.0.1');
console.log('Servidor arrancado en http://127.0.0.1:1337');
