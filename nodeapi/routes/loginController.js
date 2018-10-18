'use strct';

// Creamos un Controller que nos servirá para asociar a rutas en app.js

const bcrypt = require('bcrypt');

const Usuario = require('../models/Usuario');

class LoginController {

  // GET "/"
  index(req, res, next) {
    res.locals.email = process.env.NODE_ENV === 'development' ? 'admin@example.com' : '';
    res.locals.error = '';
    res.render('login');
  }

  async post(req, res, next) {
    try {
      
      // recoger parámetros del cuerpo de la petición
      const email = req.body.email;
      const password = req.body.password;
      
      //buscar el usuario
      const usuario = await Usuario.findOne({ email: email });

      if (!usuario || !await bcrypt.compare( password, usuario.password)) {
        res.locals.email = email;
        res.locals.error = res.__('Invalid credentials');
        res.render('login');
        return;
      }

      // usuario encontrado y password ok
      // ...
      res.redirect('/privado');

    } catch(err) {
      next(err);
    }
  }

}

module.exports = new LoginController();
