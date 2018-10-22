'use strict';

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator/check');

const sessionAuth = require('../lib/sessionAuth');
const Usuario = require('../models/Usuario');

// Todas las llamadas a este router requieren autenticación
router.use(sessionAuth());

router.get('/', (req, res, next) => {
  res.render('privado');
});

/**
 * POST /sendEmail
 * Envia un email al usuario logado en el site
 */
router.post('/sendEmail', [
  body('texto').isString().withMessage('debe ser un texto') // validación
], async (req, res, next) => {
  try {

    validationResult(req).throw(); // pasa los errores de validación a next(err)

    const texto = req.body.texto;

    // le enviamos un email
    await req.user.sendEmail('NodeAPI <admin@nodeapi.com>', 'Prueba de email', texto);

    // respondemos
    res.json({ success: true, result: 'sent' });

  } catch(err) {
    next(err);
    return;
  }
});

module.exports = router;
