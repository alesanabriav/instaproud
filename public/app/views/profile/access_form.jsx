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
    var show = 'hidden';
    if(this.props.showRecover) {
      show = '';
    }

    return (
      <form className="form-login col-lg-12" onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="form-group col-xs-8">
            <input type="text" className="form-control" onChange={this.handleChange} ref="username" placeholder="Usuario"/>
          </div>
          <div className="col-xs-4">@bvc.com.co</div>
        </div>
        <div className="form-group">
          <input type="password" className="form-control" onChange={this.handleChange} ref="password" placeholder="Contraseña" />
          <a href="#"
            onClick={this.handleRecover}
            style={{padding: '5px' }}
            className={"pull-right " + show}>
            ¿olvido contraseña?
          </a>
        </div>

        <button className="form-login-btn btn">{this.props.buttonText}</button>
      </form>
    );
  }
});