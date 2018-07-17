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

module.exports = router;
