var request = require('supertest-as-promised');
var fs = require('fs');
var path = require('path');
var api = require('../app.js');
request = request(api);

describe('Photo resource', function() {
  before(function() {
    request
    .post('/login')
    .send({email: 'cotizacion@bvc.com.co', password: '0PT1M4.cc'})
    .end(function(err, res){
      console.log(res.body);
      done(err);
    })
  });

  it ('should upload photo', function(done) {
    var p = path.join(__dirname, 'fixtures/500.jpg');
    fs.readFile(p, function (err, data) {
      if (err) throw err;
      var b64 = new Buffer(data).toString("base64");
      var img64 = b64.replace(/^data:image\/(png|jpg);base64,/, "");

      var img = encodeURIComponent(img64);
      var data = {img: img};
      request
      .post('/photos')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
      })

       
    });
   
  });

  it('should apply filter to photo', function(done) {
     done();
  });

  it('should store photo', function(done) {
     done();
  });

  it('should add hashtags to photo', function(done) {
     done();
  });

  it('should return photos', function(done) {
    done();
  });

  it('should return a photo', function(done) {
    done();
  });


});
