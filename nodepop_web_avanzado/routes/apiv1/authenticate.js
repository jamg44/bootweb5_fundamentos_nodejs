'use strict'

const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const Usuario = require('../../models/Usuario')

// POST /authenticate
router.post('/', async (req, res, next) => {
  try {
    const email = req.body.email
    const password = req.body.password

    // hacemos un hash de la password
    const hashedPassword = Usuario.hashPassword(password)

    const user = await Usuario.findOne({ email: email, password: hashedPassword })

    if (!user) {
      // Respondemos que no son validas las credenciales
      res.json({ok: false, error: 'invalid credentials'})
      return
    }

    // el usuario está y coincide la password

    // creamos el token
    jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '2d'
    }, (err, token) => {
      if (err) {
        return next(err)
      }
      // respondemos con un JWT
      res.json({ok: true, token: token})
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
