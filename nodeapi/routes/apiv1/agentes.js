'use strict';

const express = require('express');
const router = express.Router();
var createError = require('http-errors');

const Agente = require('../../models/Agente');

/**
 * GET /
 * Retorna una lista de agentes
 */
router.get('/', async (req, res, next) => {
  try {

    // recuperar datos de entrada
    const name = req.query.name;
    const age = req.query.age;
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const fields = req.query.fields;
    const sort = req.query.sort;

    // crear el filtro vacio
    const filtro = {};

    if (name) {
      filtro.name = name;
    }

    if (age) {
      filtro.age = age;
    }

    const agentes = await Agente.listar(filtro, limit, skip, fields, sort);
    // si await falla, lanza una excepción --> throw new Exception()
    res.json({ success: true, result: agentes });
  } catch (err) {
    next(err);
  }  
});

/**
 * GET /:id
 * Retorna un agente
 */
router.get('/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;

    const agente = await Agente.findById(_id).exec();

    if (!agente) {
      next(createError(404));
      return;
    }

    res.json({ success: true, result: agente });

  } catch (err) {
    next(err);
  }
})

/**
 * POST /
 * Crea una agente en la colección
 */
router.post('/', async (req, res, next) => {
  try {
    const datosAgente = req.body;

    // crear un agente en memoria
    const agente = new Agente(datosAgente);

    // guardarlo en la base de datos
    const agenteGuardado = await agente.save();

    res.json({ success: true, result: agenteGuardado });

  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /:id
 * Elimina un agente
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;

    await Agente.remove({ _id: _id }).exec();

    res.json({ success: true });

  } catch (err) {
    next(err);
  }
});

/**
 * PUT /:id
 * Actualiza un agente
 */
router.put('/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;
    const datosAgente = req.body;

    // usamos { new: true } para que retorne el agente actualizado
    const agenteActualizado = await Agente.findByIdAndUpdate(_id, datosAgente, { new: true }).exec();
    res.json({ success: true, result: agenteActualizado });

  } catch (err) {
    next(err);
  }
});

module.exports = router;