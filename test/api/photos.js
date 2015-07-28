'use strict';
var supertest = require('supertest');
var agent = supertest.agent('localhost:3000');
var fs = require('fs');

function base64Encode(file) {
  var bitmap = fs.readFileSync(file);
  return new Buffer(bitmap).toString('base64');
}

describe('Api photos', function() {
  var photoId;
  var userId;

  before(function(done) {
    var user = {username: 'al3', password: '1234'};
    agent
    .post('/login')
    .send(user)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      userId = res.body.id;
      done();
    });
  });


  it('should store a photo', function(done) {
    this.timeout(5000);
    var image = base64Encode('./test/fixtures/500.jpeg');
    var data = {
      'image': image,
      'caption': '#batman #bat',
      'geolocation': {
        'name': 'los cedros',
        'longitude': '-74.0271377',
        'latitude': '4.7212798'
      },
      'tagged': []
    };

    agent
    .post('/api/photos')
    .send(data)
    .set('Accept', 'application/json')
    .expect(201)
    .end(function(err, res) {
      if (err) return done(err);
      var body = res.body;
      photoId = body.id;
      expect(body).to.have.property('id');
      expect(body).to.have.property('owner');
      expect(body).to.have.property('path');
      expect(body).to.have.property('caption');
      expect(body).to.have.property('geolocation');
      expect(body).to.have.property('hashtags');
      done();
    });
  });

  it('should update a photo data', function(done) {
    var data = {
      'caption': '#batman #bat #bet',
      'geolocation': {
        'name': 'los cedros',
        'longitude': '-74.0271377',
        'latitude': '4.7212798'
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
      expect(body).to.have.property('caption');
      expect(body).to.have.property('geolocation');
      expect(body).to.have.property('hashtags').with.length(2);
      done();
    });
  });

  it('should get array of photos', function(done) {
    agent
    .get('/api/photos')
    .set('Accept', 'application/json')
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      var body = res.body;
      expect(body).to.be.a('array');
      expect(body[0]).to.have.property('id');
      expect(body[0]).to.have.property('path');
      expect(body[0]).to.have.property('owner');
      done();
    });
  });

  it('should store a comment', function(done) {
    var data = {comment: 'Probando con #hashtag y @al3'};

    agent
    .post('/api/photos/' + photoId + '/comments')
    .send(data)
    .set('Accept', 'application/json')
    .expect(201)
    .end(function(err, res) {
      if (err) return done(err);
      var body = res.body;
      expect(body).to.have.property('id');
      expect(body).to.have.property('commenter');
      expect(body).to.have.property('text');
      expect(body).to.have.property('created');
      done();
    });
  });

  it('should photo be tagged', function(done) {
    var data = {tagged: userId};

    agent
    .post('/api/photos/' + photoId + '/tagged')
    .send(data)
    .set('Accept', 'application/json')
    .expect(201)
    .end(function(err, res) {
      if (err) return done(err);
      var body = res.body;
      expect(body).to.have.property('tagged');
      expect(body.taggedCount).to.equal(1);
      done();
    });
  });
});
