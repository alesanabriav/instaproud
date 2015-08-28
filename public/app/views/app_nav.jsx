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

  checkSection: function() {
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

  handleClick: function(ref) {
    var node = this.refs[ref];
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
    this.loadPhoto(file);
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
      reader = window.URL.createObjectURL(file);
      var canvas = React.findDOMNode(this.refs.canv);
      var ctx = canvas.getContext("2d");
      var url;

      var img = new Image();
      img.onload = function () {
          canvas.height = canvas.width * (img.height / img.width);

          /// step 1
          var oc = document.createElement('canvas'),
              octx = oc.getContext('2d');

          oc.width = img.width * 0.5;
          oc.height = img.height * 0.5;
          octx.drawImage(img, 0, 0, oc.width, oc.height);

          /// step 2
          octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5);

          ctx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5,
          0, 0, canvas.width, canvas.height);

        url = canvas.toDataURL("image/jpeg", 1.0);
        window.URL.revokeObjectURL(reader);
        localStorage.setItem('src', url);
        pubsub.trigger('navigator:change', 'crop');

      }

      img.src = reader;

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
      <canvas ref="canv" width="500" className="hidden" />
        <li ref="home" className="home">
          <a href="#" onClick={this.handleClick.bind(null, 'home')}>
            <i className="icon ion-ios-home-outline"></i>
          </a>
        </li>

        <li ref="search" className="search">
          <a href="#search" onClick={this.handleClick.bind(null, 'search')}>
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
          <a href="#activity" onClick={this.handleClick.bind(null, 'activity')}>
            <i className="icon ion-ios-chatbubble-outline"></i>
          </a>
        </li>

        <li ref="profile" className="profile">
          <a href={"#profile/" + username} onClick={this.handleClick.bind(null, 'profile')}>
            <i className="icon ion-ios-person-outline"></i>
          </a>
        </li>

      </ul>
    );
  }
});