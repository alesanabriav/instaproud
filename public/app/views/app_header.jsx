'use strict';
var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      showCloseSession: false
    }
  },

  render: function() {
    var show = 'hidden';
    if (location.hash === '#profile') {
      show = '';
    }

    return (
      <div className="header-nav">
        <div className="container">
          <div className="logo">
            <a href="#"><img src="images/logo.svg" width="100" /></a>
          </div>
          <a href="#logout" className={'close-session-button ' +  show}>
            Salir
          </a>
        </div>
      </div>
    );
  }
});