'use strict';
var React = require('react');
var listenTo = require('react-listenTo');
var models = require('models/photo');
var Item = require('views/photos/item.jsx');
var loadImages = require('utils/loadImages');
var pubsub = require('utils/pubsub');
var $http = require('utils/http');
var _ = require('underscore');

module.exports = React.createClass({
  mixins: [listenTo],

  getInitialState: function() {
    return {
      photos: [],
      skip: 0
    }
  },

  componentDidMount: function() {
    $http.get('/api/photos', null, function(res) {
      this.setState({photos: res});
    }.bind(this));

    this.listenTo(pubsub, 'general:scroll', this.loadMore);
  },

  loadMore: function(e) {
    if (e) e.preventDefault();
    var skip = this.state.skip + 5;
    var data = {photosSkip: skip};
    var newPhotos;
    $http.get('/api/photos', data, function(res) {
      newPhotos = _.union(this.state.photos, res);
      this.setState({photos: newPhotos});
    }.bind(this));

    this.state.skip = skip;
  },

  render: function() {
    var photoNodes = this.state.photos.map(function(photo) {
      return (<Item key={photo.id} photo={photo} />);
    });
    return (
      <div>
        {photoNodes}
      </div>
    );
  }
});