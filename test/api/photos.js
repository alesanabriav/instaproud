'use strict';
var supertest = require('supertest');
var agent = supertest.agent('localhost:3000');
var mongoose = require('mongoose');
var fs = require('fs');

function base64_encode(file) {
  var bitmap = fs.readFileSync(file);
  return new Buffer(bitmap).toString('base64');
}

describe('GET /api/photos', function() {
  var src;

  before(function(done) {
    var user = {email: 'al3@bvc.com.co', password: '1234'};
    agent
    .post('/login')
    .send(user)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      console.log(res.body);
      done();
    });
  });

  it('should compress a photo', function(done) {
    agent
    .post('/api/photos/compress')
    .expect(200)
    .attach('original_image', './test/fixtures/500.jpg')
    .end(function(err, res) {
      if (err) return done(err);
      console.log(res.body);
      expect(res.body).to.be.a('string');
      done();
    });
  });

  it('should upload a photo', function(done) {
    var data = base64_encode('./test/fixtures/500.jpg');

    agent
    .post('/api/photos/upload')
    .send({img: data})
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      var body = res.body;
      expect(body).to.have.property('original');
      src = body.original;
      done();
    });
  });

  it('should filter a photo', function(done) {
    var id = src.split('_');
    var data = 'images/' + id[0] + '/' + src;


  });

  it('should get array of photos', function(done) {
    agent
    .get('/api/photos')
    .set('Accept', 'application/json')
    .expect(200)
    .end(function(err, res){
      if (err) return done(err);
      var body = res.body;
      expect(body).to.have.length(5);
      done();
    });
  });
});
