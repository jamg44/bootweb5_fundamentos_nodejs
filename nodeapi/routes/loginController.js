'use strct';

// Creamos un Controller que nos servirá para asociar a rutas en app.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/Usuario');
const namedRoutes = require('../lib/namedRoutes');

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

      // guardar la identidad del usuario en una sesión
      req.session.authUser = { _id: usuario._id };

      // usuario encontrado y password ok
      // ...
      res.redirect(namedRoutes.privado);

    } catch(err) {
      next(err);
    }
  }

  async postJWT(req, res, next) {
    try {
      
      // recoger parámetros del cuerpo de la petición
      const email = req.body.email;
      const password = req.body.password;
      
      //buscar el usuario
      const usuario = await Usuario.findOne({ email: email });

      if (!usuario || !await bcrypt.compare( password, usuario.password)) {
        res.json({ success: false, error: res.__('Invalid credentials')})
        return;
      }

      // usuario encontrado y password ok
      // no meter instancias de mongoose en el token!
      jwt.sign({ _id: usuario._id }, process.env.JWT_SECRET, {
        expiresIn: '2d'
      }, (err, token) => {
        if (err) {
          next(err);
          return;
        }
        res.json({ success: true, token: token });
      });

    } catch(err) {
      next(err);
    }
  }


  // GET /logout
  logout(req, res, next) {
    delete req.session.authUser; // borrar authUser de la sesión
    req.session.regenerate(function(err) {
      if (err) {
        next(err);
        return;
      }
      res.redirect(namedRoutes.home);
    })
  }  

}

module.exports = new LoginController();
