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
          <a href="#" className="back-button hidden pull-left animated slideInLeft" >
            <i className="icon ion-ios-arrow-back"></i>
          </a>

          <a href="#" className="close-button hidden pull-left animated slideInLeft" >
            <i className="icon ion-ios-close-empty"></i>
          </a>

          <a href="#" className="rotate-button hidden animated slideInRight">
            <i className="icon ion-ios-refresh-empty"></i>
          </a>

          <div className="logo">
            <a href="#"><img src="logo.png" width="100" /></a>
          </div>

          <a href="#" className="next-button hidden next-action animated slideInRight">
            <i className="icon ion-ios-arrow-forward"></i>
          </a>

          <a href="#" className="check-button hidden next-action">
            <i className="icon ion-checkmark"></i>
          </a>

          <a href="#logout" className={'close-session-button ' +  show}>
            Salir
          </a>
        </div>
      </div>
    );
  }
});