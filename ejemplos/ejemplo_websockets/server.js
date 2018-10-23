'use strict';

const app = require('express')();
const server = require('http').Server(app);

app.get('/', (req, res, next) => {
  res.send('ok');
});

server.listen(3000, ()=> {
  console.log('listening on port 3000');
});
