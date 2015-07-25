'use strict';
var React = require('react');
var AccessForm = require('views/profile/access_form.jsx');

module.exports = React.createClass({
  handleSubmit: function(userAccess) {
    console.log(userAccess);
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