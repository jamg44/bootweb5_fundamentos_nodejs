'use strict';

/**
 * Middleware que sirve para comprobar si un usuario está autenticado.
 * 
 * Verifica si la sesión tiene un _id y si no lo tiene redirige al usuario al login
 */

module.exports = function() {
  return function(req, res, next) {
    if (!req.session.authUser) { // si no está logado
      res.redirect('/login');
      return;
    }
    next();
  }
}