'use strict';

const app = require('express')();
const server = require('http').Server(app);

const io = require('socket.io')(server);

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
  console.log('nueva conexion de un cliente', socket.id);
  socket.on('chat message', msg => {
    console.log('mensaje recibido', msg);
    io.emit('chat message', msg);
  })
});

server.listen(3000, ()=> {
  console.log('listening on port 3000');
});
