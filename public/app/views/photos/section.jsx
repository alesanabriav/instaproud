'use strict';
var React = require('react/addons');
var Item = require('views/photos/item.jsx');
var Waypoint = require('react-waypoint');
var $http = require('utils/http');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

module.exports = React.createClass({

  getInitialState: function() {
    return {
      photos: [],
      hasMore: true,
      skip: -5
    }
  },

  componentDidMount: function() {
    this.getAll();
  },

   getStarred: function(next) {
    $http.get('/api/photos/starred', null, function(res) {
      return next(res);
    }.bind(this));
  },

  getAll: function() {
    var photos = this.state.photos;

    this.getStarred(function(starred) {
      if(starred) {
        photos = photos.concat([starred]);
      }

      $http
        .get('/api/photos', null, function(res) {
        photos = photos.concat(res);
        this._onChange(photos);
      }.bind(this));

    }.bind(this));
  },

  loadMore: function() {
    var skip = this.state.skip + 5;
    var data = {photosSkip: skip};
    var photos = this.state.photos;

    if (this.state.hasMore) {
      $http.get('/api/photos', data, function(res) {
        if (res.length === 0) {
          this.state.hasMore = false;
        }
        photos = photos.concat(res);
        this._onChange(photos);
      }.bind(this));

      this.state.skip = skip;
    }
  },

  _onChange: function(data) {
    this.setState({photos: data});
  },

  render: function() {
    var photoNodes = this.state.photos.map(function(photo) {
      return (
          <Item key={photo.id} photo={photo} />
        );
    }.bind(this));

    return (
    <div>
      {photoNodes}
      <Waypoint onEnter={this.loadMore} threshold={0.2} />
    </div>
    );
  }
});