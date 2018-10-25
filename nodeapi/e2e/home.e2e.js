const request = require('supertest');

require('dotenv').config();

// cargo la aplicación que quiero probar
const app = require('../app');

// sintaxis de Mocha
describe('Home', function(done) {
  it('should return 200', function() {
    request(app)
      .get('/')
      .expect(200, done); // verifica que devuelve un http status 200
                          // y luego llama a done()
  })
})
describe('Login', function(done) {
  it('should return 200', function() {
    request(app)
      .get('/login')
      .expect(200, done); // verifica que devuelve un http status 200
                          // y luego llama a done()
  })
})