'use strict';
var React = require('react');
var $http = require('utils/http');
var pubsub = require('utils/pubsub');
var Search = require('views/search/section.jsx');
var List = require('views/photos/list.jsx');
var Crop = require('views/photos/crop.jsx');
var Filter = require('views/photos/filter.jsx');
var Caption = require('views/photos/caption.jsx');
var Hashtag = require('views/photos/hashtag.jsx');
var Photo = require('views/photos/item.jsx');
var isMobile = require('is-mobile');
var Map = require('views/photos/locations.jsx');

module.exports = {
  unmountHeader: function() {
    var container = document.getElementById('header-container');
    return React.unmountComponentAtNode(container);
  },

  unmountNav: function() {
    var container = document.getElementById('nav-container');
    return React.unmountComponentAtNode(container);
  },

  mountComponent: function(component) {
    var container = document.getElementById('app-container');
    return React.render(component, container);
  },

  changeColorHeader: function(color) {
    pubsub.trigger('appHeader:change', {bgColor: color});
  },

  map: function() {
    this.mountComponent(<Map/>);
  },

  list: function() {
    this.mountComponent(<List/>);
  },

  item: function(id) {
    $http.get('/api/photos/' + id, null, function(res) {
      this.mountComponent(<Photo photo={res}/>);
    });
  },

  crop: function() {
    this.unmountNav();
    this.mountComponent(<Crop/>);
    this.changeColorHeader('444')
  },

  filter: function(src) {
    if (isMobile()) {
      this.unmountHeader();
    }
    this.unmountNav();
    this.mountComponent((<Filter/>);
    this.changeColorHeader('444')
  },

  caption: function(id) {
    if (isMobile()) {
      this.unmountHeader();
    }
    this.unmountNav();
    this.mountComponent(<Caption />);
    this.changeColorHeader('444')
  },

  hashtag: function(hashtag) {
    this.mountComponent(<Hashtag hashtag={hashtag}/>);
  },

  search: function() {
    this.mountComponent(<Search/>);
  }
 };
