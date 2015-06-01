var request = require('supertest-as-promised');
var api = require('../app.js');
request = request(api);

describe('Authentication module', function() {
  it('should login a user', function(done) {
    done();
  })
});