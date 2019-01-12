const request = require('supertest')
const { expect } = require('chai')
/* eslint-disable no-unused-expressions */

// Inicializamos mockgoose
const Mockgoose = require('mockgoose').Mockgoose
const mongoose = require('mongoose')
const mockgoose = new Mockgoose(mongoose)

describe('API /apiv1/', function () {
  let agent
  let app
  let token

  before(async function () {
    await mockgoose.prepareStorage()
    mongoose.Promise = global.Promise
    await mongoose.connect('mongodb://example.com/TestingDB', {
      useMongoClient: true
    })
    // limpiamos las definiciones de modelos y esquemas de mongoose
    mongoose.models = {}
    mongoose.modelSchemas = {}
    const mongodbFixtures = require('./mongodb.fixtures')
    await mongodbFixtures.initAnuncios()
    await mongodbFixtures.initUsuarios()
    app = require('../app')
    agent = request.agent(app)
  })

  describe('POST /autehticate', function () {
    it('should return JWT', async function () {
      const response = await agent
        .post('/apiv1/authenticate')
        .send({ email: 'user@example.com', password: '1234' })
        .expect(200)
      expect(response.body.ok).to.equal(true)
      expect(response.body.token).to.be.not.undefined
      token = response.body.token
    })
  })

  describe('GET /', function () {
    it('should return 200', function (done) {
      agent
        .get('/apiv1/anuncios')
        .set('x-access-token', token)
        .expect('Content-Type', /json/)
        .expect(200, done)
    })

    it('should have ok:true', async function () {
      const response = await agent
        .get('/apiv1/anuncios')
        .set('x-access-token', token)
        .expect(200)
      expect(response.body.ok).to.equal(true)
    })

    it('should return array of products', async function () {
      const response = await agent
        .get('/apiv1/anuncios')
        .set('x-access-token', token)
        .expect(200)
      expect(response.body.result.rows.length).to.equal(2)
    })

    it('should return only use positive start', async function () {
      const response = await agent
        .get('/apiv1/anuncios?start=-1')
        .set('x-access-token', token)
        .expect(500)
      expect(response.body.success).to.equal(false)
      expect(response.body.error).to.be.not.undefined
    })
  })

  describe('GET /tags', function () {
    it('should return 200', function (done) {
      agent
        .get('/apiv1/anuncios/tags')
        .set('x-access-token', token)
        .expect('Content-Type', /json/)
        .expect(200, done)
    })

    it('should have ok:true', async function () {
      const response = await agent
        .get('/apiv1/anuncios/tags')
        .set('x-access-token', token)
        .expect(200)
      expect(response.body.ok).to.equal(true)
    })

    it('should return array with tags', async function () {
      const response = await agent
        .get('/apiv1/anuncios/tags')
        .set('x-access-token', token)
        .expect(200)
      expect(response.body.allowedTags.length).to.equal(4)
    })
  })
})
