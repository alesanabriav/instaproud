'use strict';
var React = require('react');
var AccessForm = require('views/profile/access_form.jsx');
var $http = require('utils/http');
var Modal = require('react-bootstrap').Modal;

module.exports = React.createClass({
  getInitialState: function() {
    return {
      errorMessage: '',
      modalIsOpen: false
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

  handleRecover: function() {
    this.setState({modalIsOpen: true});
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  sendRecovery: function() {
    var username = React.findDOMNode(this.refs.username).value;
    $http.post('/users/recoverpassword/'+ username, null, function(res, err) {
      console.log(res);
    });
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
          <AccessForm
            onFormSubmit={this.handleSubmit}
            onRecover={this.handleRecover}
            buttonText="Iniciar Sesión"
            showRecover={true}
            />
          <div className="col-xs-12">
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