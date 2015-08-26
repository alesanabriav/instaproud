'use strict';
var React = require('react');
var $http = require('utils/http');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      errorMessage: ''
    }
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var data = {
      password: React.findDOMNode(this.refs.password).value.toLowerCase().trim(),
      rePassword: React.findDOMNode(this.refs.password_re).value.toLowerCase().trim()
    };

    $http.post('/user/recover/' + this.props.userId + '?code=' + this.props.salt, data, function(res, err) {
      if(err) this.setState({errorMessage: err.message});
      if (res && res.status) {
        window.location.hash = "#login";
      }
    }.bind(this));
  },

  render: function() {
    var message = '';
    console.log(this.state.errorMessage);
    if (this.state.errorMessage && this.state.errorMessage.length > 0) {
      message = (<div className="alert alert-danger">{this.state.errorMessage}</div>);
    }

    return (
      <section className="profile-edit">
        <header>
          <h4>Restablecer contraseña</h4>

        </header>
      <form onSubmit={this.handleSubmit}>

          <div className="form-group">
            <input
              ref="password"
              type="password"
              className="form-control"
              placeholder="Contraseña nueva"
            />
          </div>

          <div className="form-group">
            <input
              ref="password_re"
              type="password"
              className="form-control"
              placeholder="Verificar contraseña "
            />
          </div>

          <button className="btn btn-primary"><i className="icon ion-ios-arrow-forward"></i></button>
      </form>

      <div className="row">
        <div className="col-xs-12">
          <br />
          {message}
        </div>
      </div>

      </section>
    );
  }
});