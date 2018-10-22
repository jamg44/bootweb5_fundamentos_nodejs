'use strict';

const express = require('express');
const router = express.Router();

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
router.post('/sendEmail', async (req, res, next) => {
  try {

    const texto = req.body.texto;

    // le enviamos un email
    req.user.sendEmail('NodeAPI <admin@nodeapi.com>', 'Prueba de email', texto);

    // respondemos
    res.json({ success: true, result: 'sent' });

  } catch(err) {
    next(err);
    return;
  }
});

module.exports = router;
