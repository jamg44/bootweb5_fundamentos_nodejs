var express = require('express');
var router = express.Router();

const { query, validationResult } = require('express-validator/check');
/* Es lo mismo que:
const validator = require('express-validator/check');
const query = validator.query;
const validationResult = validator.validationResult;*/


/* GET home page. */
router.get('/', function(req, res, next) {

  // Mandar un mensaje al hilo master del cluster:
  //process.send('hola master, soy el worker: ' + process.pid);

  const segundo = (new Date()).getSeconds();

  res.locals.valor = `<script>alert("${res.__("hi, you are hacked")}")</script>`;

  // la vista se renderiza (calcula) EN EL SERVIDOR
  res.render('index', {
    condicion: {
      segundo: segundo,
      par: segundo % 2 === 0
    },
    users: [
      { name: 'Smith', age: 20 },
      { name: 'Thomas', age: 37 },
      { name: 'Jones', age: 18 },
    ]
  });
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

router.get('/enquerystring', [ // validations
  query('talla').isNumeric().withMessage('debe ser numérico'),
  //query('color').isNumeric().withMessage('debe ser numérico')
], (req, res, next) => {
  // http://localhost:3000/enquerystring/?color=rojo&talla=M
  console.log(req.query);
  validationResult(req).throw(); // pasa los errores de validación a next(err)

  // si la ejecución llega aquí, es que todos los parámetros son validos
  res.send('ok');
});

router.post('/enelbody', (req, res, next) => {
  console.log('req.body', req.body);
  res.send('ok');
});

module.exports = router;
