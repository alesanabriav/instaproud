'use strict';
var React = require('react');
var Item = require('views/photos/item.jsx');
var loadImages = require('utils/loadImages');
var pubsub = require('utils/pubsub');
var $http = require('utils/http');
var _ = require('underscore');
var Waypoint = require('react-waypoint');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      photos: [],
      starred: {},
      skip: 0,
      hasMore: true
    }
  },

  componentDidMount: function() {
    $http.get('/api/photos', null, function(res) {
      this.setState({photos: res});
    }.bind(this));

    $http.get('/api/photos/starred', null, function(res) {
      this.setState({starred: res});
    }.bind(this));
  },

  loadMore: function(e) {
    var skip = this.state.skip + 5;
    var data = {photosSkip: skip};
    var hasMore = this.state.hasMore;
    var newPhotos = [];

    if (hasMore) {
      $http.get('/api/photos', data, function(res) {
        if (res.length === 0) {
          this.setState({hasMore: false});
        }
        newPhotos = this.state.photos.concat(res);
        this.setState({photos: newPhotos});
      }.bind(this));
      this.state.skip = skip;
    }
  },

  render: function() {

    var starred = '';

    if (!_.isEmpty(this.state.starred)) {
      starred = (<Item photo={this.state.starred} />);
    }
    var photoNodes = this.state.photos.map(function(photo) {
      return (<Item key={photo.id} photo={photo} />);
    }.bind(this));

    return (
      <div>
      {photoNodes}
      <Waypoint
        onEnter={this.loadMore}
        threshold={0.2}
      />
      </div>

    );
  }
});