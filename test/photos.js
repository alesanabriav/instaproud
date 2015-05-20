var request = require('supertest-as-promised');
var base64Img = require('base64-img');
var api = require('../app.js');
request = request(api);

describe('photo add filter', function() {
  it('should add filter to image', function(done) {

    var src = '/uploads/500.jpg';

    request
    .get('/photos/filter')
    .send({src: src, filter: 'hemingway'})
    .set('accept', 'application/json')
    .end(function(err, res){
      console.log(res.body);
      done(err);
    });

  });
});
