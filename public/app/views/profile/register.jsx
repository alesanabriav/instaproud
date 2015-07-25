'use strict';
var React = require('react');
var AccessForm = require('views/profile/access_form.jsx');
var $http = require('utils/http');
var alertify = require('alertifyjs');

module.exports = React.createClass({
  handleSubmit: function(userAccess) {
    var userToStore;
    var data = {
      email: userAccess.username + '@bvc.com.co',
      password: userAccess.password
    };

    $http.post('/users', data, function(res){
      if (res.message || res.error) {
        alertify.error(res.message);
        return;
      }

      userToStore = {id: res.id, username: res.username, role: res.role, active: res.active};
      localStorage.setItem('user', JSON.stringify(userToStore));
      window.location.replace('#profile/' + res.id + '/edit');
    });
  },

  render: function() {
    return (
      <section className="login">
        <header>
          <img src="images/logo.svg" className="login" />
        </header>
        <ul className="nav nav-tabs">
            <li>
              <a href="#login">INGRESAR</a>
            </li>

            <li className="active">
              <a href="#register">REGISTRO</a>
            </li>
          </ul>

        <div className="tabs-and-form">
        <AccessForm onFormSubmit={this.handleSubmit} buttonText="Registrarse" />
        </div>
      </section>
    );
  }
});