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
      password: React.findDOMNode(this.refs.password).value,
      newPassword: React.findDOMNode(this.refs.password_new).value,
      rePassword: React.findDOMNode(this.refs.password_re).value
    };

    $http.post('/api/users/' + this.props.userId + '/password', data, function(res, err) {
      if(err) this.setState({errorMessage: err.message});
      if (res && res.status) {
        window.location.hash = "#";
      }
    }.bind(this));

  },

  render: function() {
    var message = '';

    if (this.state.errorMessage || this.state.errorMessage.length > 0) {
      message = (<div className="alert alert-danger">{this.state.errorMessage}</div>);
    }

    return (
      <section className="profile-edit">
        <header>
          <h4>Cambiar contraseña</h4>

        </header>
      <form onSubmit={this.handleSubmit}>
         <div className="form-group">
            <input
              ref="password"
              type="password"
              className="form-control"
              placeholder="Contraseña actual"
            />
          </div>
          <div className="form-group">
            <input
              ref="password_new"
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