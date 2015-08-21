'use strict';
var React = require('react');
var AccessForm = require('views/profile/access_form.jsx');
var $http = require('utils/http');
var alertify = require('alertifyjs');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      message: ''
    }
  },

  handleSubmit: function(userAccess) {
    var userToStore;
    var rexUsername = /([a-z]){4,}/g;

    var data = {
      email: userAccess.username + '@bvc.com.co',
      password: userAccess.password
    };

    if (!rexUsername.test(userAccess.username)) {
      this.setState({message: 'El usario no cumple con los parametros'});
      return;
    }

    $http.post('/users', data, function(res, err){
      if (err.message) {
        this.setState({message: err.message});
        return;
      }

      if (res.message || res.error) {
        this.setState({message: res.message});
        return;
      }

      userToStore = {
        id: res.id,
        username: res.username,
        role: res.role,
        active: res.active
      };

      localStorage.setItem('user', JSON.stringify(userToStore));
      window.location.replace('#profile/' + res.id + '/edit');
    }.bind(this));
  },

  render: function() {
    var message = '';

    if (this.state.message.length > 0) {
      message = (<div><br/><div className="alert alert-danger">{this.state.message}</div></div>);
    }

    return (
      <section className="login">
        <header>
          <img src="images/logo.svg" className="login" />
        </header>
        <ul className="nav nav-tabs">
            <li>
              <a href="#login">Ingresar</a>
            </li>

            <li className="active">
              <a href="#register">Soy Nuevo</a>
            </li>
          </ul>

        <div className="tabs-and-form">
        <AccessForm onFormSubmit={this.handleSubmit} showPasswordLabel={true} buttonText="Registrarse" />
        <img src="/images/gh-logo.png" width="100" style={{display: 'block','margin': '0 auto'}} />
          <div className="col-xs-12">
          {message}
          </div>
        </div>
      </section>
    );
  }
});