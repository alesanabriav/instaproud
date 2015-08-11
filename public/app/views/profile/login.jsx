'use strict';
var React = require('react');
var AccessForm = require('views/profile/access_form.jsx');
var $http = require('utils/http');
var Modal = require('react-bootstrap').Modal;
var ReCATPCHA = require("react-google-recaptcha");

module.exports = React.createClass({
  getInitialState: function() {
    return {
      errorMessage: '',
      message: '',
      modalIsOpen: false,
      showCaptcha: false,
      captchaIsValid: false
    }
  },

  handleSubmit: function(userAccess) {
    var userToStore;
    var data = {
      username: userAccess.username,
      password: userAccess.password
    };

    if(!this.state.showCaptcha) {
      this.logginUser(data);
      return;
    }

    if(this.state.showCaptcha && this.state.captchaIsValid) {
      this.logginUser(data);
    }

  },

  logginUser: function(data) {
    $http.post('/login', data, function(res){
      if (res.message || res.error) {
        if(res.message === 'Usuario bloqueado') {
            this.setState({showCaptcha: true});
        }
        this.setState({errorMessage: res.message});
        return;
      }
      userToStore = {id: res.id, username: res.username, role: res.role, active: res.active};
      localStorage.setItem('user', JSON.stringify(userToStore));
      window.location.replace('#');
    }.bind(this));
  },

  handleRecover: function() {
    this.setState({modalIsOpen: true});
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  sendRecovery: function(e) {
    e.preventDefault();
    var username = React.findDOMNode(this.refs.username).value;
    $http.post('/users/recoverpassword/'+ username, null, function(res, err) {
      this.setState({
        message: 'restablecer contraseña enviado',
        modalIsOpen: false
      });
    }.bind(this));
  },

  captchaCallback: function(res) {
    this.setState({captchaIsValid: true});
  },

  render: function() {
    var message = '';
    var captcha = '';

    if (this.state.errorMessage.length > 0) {
      message = (<div className="alert alert-danger">{this.state.errorMessage}</div>);
    }

    if (this.state.message.length > 0) {
      message = (<div className="alert alert-warning">{this.state.message}</div>);
    }

    if(this.state.showCaptcha) {
      captcha = (
        <ReCATPCHA
          sitekey="6LcCIAsTAAAAABFdhElgOPUdKU7nbWxQCLfd0bgi"
          onChange={this.captchaCallback}
        />
      );
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
          <AccessForm
            onFormSubmit={this.handleSubmit}
            onRecover={this.handleRecover}
            buttonText="Iniciar Sesión"
            showRecover={true}
            />
          <div className="col-xs-12">
            <br />
            {captcha}
            <br />
            {message}
          </div>
        </div>

        <Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
          <Modal.Header closeButton>
          <h4>Restablecer contraseña</h4>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.sendRecovery}>
              <input ref="username" type="text" className="form-control" placeholder="Usuario"/>
              <br/>
              <button className="btn btn-primary" style={{width: '100%'}}>Enviar</button>
            </form>
          </Modal.Body>
        </Modal>

      </section>
    );
  }
});