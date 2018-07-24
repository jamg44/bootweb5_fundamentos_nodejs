var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const { isAPI } = require('./lib/utils');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// para servir ficheros estáticos
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/pdfs', express.static('e:\pdfs'));

// Variables globales de template
app.locals.titulo = 'NodeAPI';

/**
 * Conectamos a la base de datos
 * y registramos los modelos
 */
require('./lib/connectMongoose');
require('./models/Agente');

/**
 * Rutas de mi API
 */
app.use('/apiv1/agentes', require('./routes/apiv1/agentes'));

/**
 * Rutas de mi aplicación web
 */
app.use('/',        require('./routes/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  // error de validación
  if (err.array) {
    err.status = 422;
    const errorInfo = err.array({ onlyFirstError: true })[0];
    err.message =  isAPI(req) ? 
      { message: 'Not valid', errors: err.mapped() } 
      : `Not valid - ${errorInfo.param} ${errorInfo.msg}`;
  }

  res.status(err.status || 500);

  if (isAPI(req)) {
    res.json({ success: false, error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

module.exports = app;
