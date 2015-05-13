var request = require('supertest-as-promised');
var api = require('../app.js');
request = request(api);


describe('photos handle images', function() {
  it('should upload image', function(done) {
    var data;

    request
    .post('/photos')
    .set('accept', 'application/json')
    .attach('photo', 'test/fixtures/img_w_960.jpg')
    .send()
    .then(function(res) {

      return request
        .get('/photos?src=/'+res.text+'&x=0&y=0,scale= 0')
        .send(data);
    }).then(function(res){
      console.log(res.text);
      done();
    });

  });
});
