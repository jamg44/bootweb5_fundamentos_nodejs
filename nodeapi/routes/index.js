var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // la vista se renderiza (calcula) EN EL SERVIDOR
  res.render('index', { title: 'Express' });
});

router.get('/otrapagina', function(req, res, next) {
  // en un middleware podemos responder:
  //res.send('ok');
  // o llamar a next
  next(new Error('no permitido'));
});

router.get('/paramenruta/:dato', (req, res, next) => {
  const dato = req.params.dato;
  res.send('ok, recibido dato:' + dato);
});

router.get('/paramenrutaopt/:dato?', (req, res, next) => {
  const dato = req.params.dato;
  res.send('ok, recibido dato opcional: ' + dato);
});

router.get('/params/:id([0-9]+)/piso/:piso/puerta/:puerta', (req, res, next) => {
  const id = req.params.id;
  console.log(req.params);
  res.send('ok, recibido id: ' + id);
});


module.exports = router;
