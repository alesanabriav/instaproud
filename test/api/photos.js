'use strict';
var supertest = require('supertest');
var agent = supertest.agent('localhost:3000');
var fs = require('fs');

function base64Encode(file) {
  var bitmap = fs.readFileSync(file);
  return new Buffer(bitmap).toString('base64');
}

describe('GET /api/photos', function() {
  var src;
  var srcPhotoWithFilter;
  var photoId;

  before(function(done) {
    var user = {email: 'al3@bvc.com.co', password: '1234'};
    agent
    .post('/login')
    .send(user)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
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
      expect(res.body).to.be.a('string');
      done();
    });
  });

  it('should upload a photo', function(done) {
    var data = base64Encode('./test/fixtures/500.jpg');

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
    var filter = 'love';

    agent
    .post('/api/photos/filter')
    .send({src: data, filter: filter})
    .expect(200)
    .end(function(err, res) {
      if(err) return done(err);
      var body = res.body;
      expect(body).to.have.property('photo');
      srcPhotoWithFilter = body.photo;
      done();
    });
  });

  it('should store original photo', function(done) {
    var id = src.split('_');
    var data = 'images/' + id[0] + '/' + src;

    agent
    .post('/api/photos')
    .send({src: src})
    .expect(201)
    .end(function(err, res) {
      if(err) return done(err);
      var body = res.body;
      photoId = body.id;
      expect(body).to.have.property('path');
      expect(body).to.have.property('owner');
      expect(body).to.have.property('created');
      expect(body).to.have.property('tagged');
      expect(body).to.have.property('comments');
      expect(body).to.have.property('liked');
      expect(body).to.have.property('id');
      done();
    });
  });

  it('should update a photo data', function(done) {
    var data = {
      caption: 'test',
      'geolocation': {
        'longitude': -74.0271377,
        'latitude': 4.7212798
      }
    };
    agent
    .put('/api/photos/' + photoId)
    .send(data)
    .set('Accept', 'application/json')
    .expect(200)
    .end(function(err, res) {
      if(err) return done(err);
      var body = res.body;
      console.log(body);
      expect(body).to.have.property('caption');
      expect(body).to.have.property('geolocation');
      done();
    });
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
