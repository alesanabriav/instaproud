'use strict';
var React = require('react');
var AccessForm = require('views/profile/access_form.jsx');
var $http = require('utils/http');
var alertify = require('alertifyjs');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      errorMessage: ''
    }
  },
  handleSubmit: function(userAccess) {
    var userToStore;
    var data = {
      username: userAccess.username,
      password: userAccess.password
    };

    $http.post('/login', data, function(res){
      if (res.message || res.error) {
        this.setState({errorMessage: res.message});
        return;
      }
      userToStore = {id: res.id, username: res.username, role: res.role, active: res.active};
      localStorage.setItem('user', JSON.stringify(userToStore));
      window.location.replace('#');
    }.bind(this));
  },

  render: function() {
     var message = '';

    if (this.state.errorMessage.length > 0) {
      message = (<div className="alert alert-danger">{this.state.errorMessage}</div>);
    }
    return (
      <section className="login">
        <header>
          <img src="images/logo.svg" className="login" />
        </header>
        <ul className="nav nav-tabs">
            <li className="active">
              <a href="#login">INGRESAR</a>
            </li>

            <li>
              <a href="#register">REGISTRO</a>
            </li>
          </ul>

        <div className="tabs-and-form">
          <AccessForm onFormSubmit={this.handleSubmit} buttonText="Iniciar Sesión" />
          <div className="col-xs-12">
            <br />
            {message}
          </div>
        </div>
      </section>
    );
  }
});