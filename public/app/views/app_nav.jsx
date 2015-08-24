'use strict';
var React = require('react');
var listenTo = require('react-listenTo');
var pubsub = require('utils/pubsub');
var $ = require('jquery');
var _ = require('underscore');
var $http = require('utils/http');
var alertify = require('alertifyjs');
var mobile = require('is-mobile');

module.exports = React.createClass({
  mixins: [listenTo],

  getInitialState: function() {
    return {
      hash: '',
      last: null
    }
  },

  componentDidMount: function() {
    this.listenTo(pubsub, 'input:onFocus', this.hide);
    this.listenTo(pubsub, 'input:onFocusOut', this.show);
    this.checkSection();
  },

  checkSection: function(e) {
    var hash = window.location.hash;
    var key = '';
    var node = this.refs['home'];

    if (hash) {
      key = hash.replace('#', '');
      node = this.refs[key];
    }

    if(this.state.last) {
      $(React.findDOMNode(this.state.last)).removeClass('active');
    }

   this.setState({last: node});
   $(React.findDOMNode(node)).addClass('active');
  },

  hide: function() {
    $(React.findDOMNode(this)).hide();
  },

  /** show this */
  show: function() {
     $(React.findDOMNode(this)).show();
  },

  handleFile: function(e) {
    var file = $(e.target)[0].files[0];

    if (mobile()) {
      this.uploadPhoto(file);
    } else {
      this.loadPhoto(file);
    }
  },

  uploadPhoto: function(file) {
    alertify.warning('Subiendo imagen. Tenga en cuenta que su conexion podria afectar el tiempo de espera.');

    $http.upload('/api/photos/compress', 'original_image', file, function(res) {
      localStorage.setItem('src', res);
      pubsub.trigger('navigator:change', '#crop');
    });
  },

  loadPhoto: function(file) {
    var reader;

    if (file.type.match(/image.*/)) {
      reader = new FileReader();

      reader.onload = function() {
        localStorage.setItem('src', reader.result);
        pubsub.trigger('navigator:change', '#crop');
      };

      reader.readAsDataURL(file);

    } else {
      alertify.error('Tipo de archivo no permitido');
    }
  },

  render: function() {
    var username = '';
    if (localStorage.getItem('user')) {
      username = JSON.parse( localStorage.getItem('user') ).username;
    }

    return (
      <ul className="footer-nav-actions">

        <li ref="home" className="home">
          <a href="#" onClick={this.checkSection}>
            <i className="icon ion-ios-home-outline"></i>
          </a>
        </li>

        <li ref="search" className="search">
          <a href="#search" onClick={this.checkSection}>
            <i className="icon ion-ios-search"></i>
          </a>
        </li>

        <li ref="camera" className="camera">
          <span className="btn-file">
            <i className="icon ion-ios-camera-outline"></i>
            <input type="file" onChange={this.handleFile} className="uploadPhoto" name="photo" />
          </span>
        </li>

        <li ref="activity" className="activity">
          <a href="#activity" onClick={this.checkSection}>
            <i className="icon ion-ios-chatbubble-outline"></i>
          </a>
        </li>

        <li ref="profile" className="profile">
          <a href={"#profile/" + username} onClick={this.checkSection}>
            <i className="icon ion-ios-person-outline"></i>
          </a>
        </li>

      </ul>
    );
  }
});