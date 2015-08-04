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
      skip: 0
    }
  },

  componentDidMount: function() {
    this.getAll();
  },

  componentWillLeave: function() {
    console.log('will leave');
  },

   getStarred: function(next) {
    $http.get('/api/photos/starred', null, function(res) {
      return next(res);
    }.bind(this));
  },

  getAll: function() {
    var photos = [];

    this.getStarred(function(starred) {

      $http
        .get('/api/photos', null, function(res) {
        if(starred) {
          photos = [starred].concat(res);
        } else {
          photos = res;
        }

        this._onChange(photos);
      }.bind(this));

    }.bind(this));
  },

  loadMore: function() {
    var skip = this.state.skip + 5;
    var data = {photosSkip: skip};
    var newPhotos = [];
    var photos = this.state.photos;

    if (this.state.hasMore) {
      $http.get('/api/photos', data, function(res) {
        if (res.length === 0) {
          this.state.hasMore = false;
        }

        newPhotos = photos.concat(res);
        this._onChange(newPhotos);
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