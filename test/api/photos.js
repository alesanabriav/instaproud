var supertest = require('supertest');
var request = supertest('http://localhost:3000');
var cookie;
describe('GET /api/photos', function() {

  before(function(done) {
    var data = {email: 'al3@bvc.com.co', password: '1234'};

    request
    .post('/login')
    .send(data)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      cookie = res.headers['set-cookie'];
      done();
    });
  });

  it('should get array of photos', function(done) {
    request
    .get('/api/photos')
    .set('cookie', cookie)
    .expect(200)
    .end(function(err, res){
      if (err) return done(err);
      console.log(res.body);
      done();
    })

  })

})