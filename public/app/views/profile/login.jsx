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
    var userToStore;
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

  handleRecover: function(e) {
    e.preventDefault();
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
      message = (<div><br/><div className="alert alert-danger">{this.state.errorMessage}</div></div>);
    }

    if (this.state.message.length > 0) {
      message = (<div><br/><div className="alert alert-warning">{this.state.message}</div></div>);
    }

    if(this.state.showCaptcha) {
      captcha = (
        <div>
        <br />
        <ReCATPCHA
          sitekey="6LcCIAsTAAAAABFdhElgOPUdKU7nbWxQCLfd0bgi"
          onChange={this.captchaCallback}
        />
        </div>
      );
    }

    return (
      <section className="login">
        <header>
          <img src="images/logo.svg" className="login" />
        </header>
        <ul className="nav nav-tabs">
            <li className="active">
              <a href="#login">Ingresar</a>
            </li>

            <li>
              <a href="#register">Soy Nuevo</a>
            </li>
          </ul>

        <div className="tabs-and-form">
          <AccessForm
            onFormSubmit={this.handleSubmit}
            buttonText="Iniciar Sesión"
            showRecover={true}
            />
            <a href="#"
            onClick={this.handleRecover}
            style={{'display': 'block', 'text-align': 'center', 'color': '#ccc', 'fontWeight': 200, 'margin-top': '20px'}}
            >
            ¿Olvidaste tu contraseña?
          </a>
          <div className="col-xs-12">
            {captcha}
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