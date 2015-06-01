var request = require('supertest-as-promised');
var api = require('../app.js');
var User = require('../models/user');
var db;
var mongoose = require('mongoose');
request = request(api);

describe('User resource', function() {

  after(function(done){
    mongoose.connection.close();
    done();

  });

  it('should create a new user', function(done) {

    var step1 = {
      'email': 'pmontenegro@bvc.com.co',
      'password': 'pppmmm6'
    };

    request
      .post('/users')
      .send(step1)
      .set('accept', 'application/json')
      .end(function(err, res) {
        var body = res.body;
        var id = body.id;

        expect(body).to.have.property('id');
        expect(body).to.have.property('email', 'pmontenegro@bvc.com.co');
        done(err);
      });
  });

  it('should update a user', function(done) {
    var step1 = {
      'email': 'alesanabria@bvc.com.co',
      'password': 'pppmmm6'
    };

      request
      .post('/users')
      .send(step1)
      .set('accept', 'application/json')
      .expect(201)
      .end(function(err, res) {
        var body = res.body;
        var id = body.id;

        var step2 = {
          'email': body.email,
          'name': "Paula Montenegro",
          'area': "Mercadeo",
          'bio': "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus fuga in, eos illo inventore animi quis at deleniti, saepe explicabo, nam neque iusto voluptas ullam sed error et. Inventore, itaque!",
          'gender': "female",
          'birthday': "01-01-1889"
        };

        expect(body).to.have.property('id');
        expect(body).to.have.property('email', step1.email);

        request
        .put('/users/'+id)
        .send(step2)
        .expect(200)
        .end(function(err, res) {
          var user = res.body;

          expect(user).to.have.property('id');
          expect(user).to.have.property('email', step1.email);
          expect(user).to.have.property('name', step2.name);
          expect(user).to.have.property('bio', step2.bio);
          expect(user).to.have.property('gender', step2.gender);
          done();
        });

      });
  })

});