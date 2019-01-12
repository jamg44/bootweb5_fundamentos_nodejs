'use strict'

const jwt = require('jsonwebtoken')

module.exports = function () { // devuelve un middleware que si no hay usuario responde con error
  return function (req, res, next) {
    const token = req.body.token || req.query.token || req.get('x-access-token')

    if (!token) {
      const err = new Error('no token provided')
      err.status = 401
      return next(err)
    }

    // tengo token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(err)
      }
      // guardo el id del usuario en request para que
      // los siguientes middlewares puedan usarlo
      req.userId = decoded._id
      next()
    })
  }
}
