'use strict';
var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      userAccess: {},
    }
  },

  handleChange: function() {
    var userAccess = {
      username: React.findDOMNode(this.refs.username).value.toLowerCase().trim(),
      password: React.findDOMNode(this.refs.password).value.toLowerCase().trim()
    };

    this.setState({
      userAccess: userAccess
    });
  },

  handleSubmit: function(e) {
    e.preventDefault();
    this.props.onFormSubmit(this.state.userAccess);
  },

  handleRecover: function(e) {
     e.preventDefault();
    this.props.onRecover();
  },

  render: function() {
    return (
      <form className="form-login col-lg-12" onSubmit={this.handleSubmit}>
        <div className="row">

          <div className="form-group col-xs-8">
            <input type="text" className="form-control" onChange={this.handleChange} ref="username" placeholder="Usuario"/>
          </div>
          <div
            className="col-xs-4"
            style={{'marginTop': '10px', 'fontWeight': '600', 'color': '#00297a'}}
            >@bvc.com.co</div>
        </div>

        <div className="form-group">
          <input type="password" className="form-control" onChange={this.handleChange} ref="password" placeholder="Contraseña" />

          <label
            style={{'color': '#ccc', 'fontWeight': 200}}
            className={this.props.showPasswordLabel ? "pull-right" : "hidden"}
          >Debe tener mínimo ocho caracteres y un número</label>
        </div>
        <button className="form-login-btn btn">{this.props.buttonText}</button>
      </form>
    );
  }
});