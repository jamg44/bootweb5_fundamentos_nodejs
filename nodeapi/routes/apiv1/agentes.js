'use strict';

const express = require('express');
const router = express.Router();

const Agente = require('../../models/Agente');

router.get('/', (req, res, next) => {
  Agente.find().exec((err, agentes) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ success: true, result: agentes });
  });
});

module.exports = router;