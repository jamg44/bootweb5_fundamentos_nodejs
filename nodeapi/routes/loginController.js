'use strct';

// Creamos un Controller que nos servirá para asociar a rutas en app.js

const Usuario = require('../models/Usuario');

class LoginController {

  // GET "/"
  index(req, res, next) {
    res.locals.email = '';
    res.locals.error = '';
    res.render('login');
  }

  async post(req, res, next) {
    try {
      
      // recoger parámetros del cuerpo de la petición
      const email = req.body.email;
      const password = req.body.password;

      console.log(email, password);
      
      //buscar el usuario
      const usuario = await Usuario.findOne({ email: email });

      console.log('usuario encontrado:', usuario);

      if (!usuario || password !== usuario.password) {
        res.locals.email = email;
        res.locals.error = res.__('Invalid credentials');
        res.render('login');
  
      }

      // usuario encontrado y password ok
      // ...

    } catch(err) {
      next(err);
    }
  }

}

module.exports = new LoginController();
