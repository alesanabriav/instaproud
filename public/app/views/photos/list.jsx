'use strict';
var React = require('react');
var listenTo = require('react-listenTo');
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
      starred: {},
      skip: 0
    }
  },

  componentDidMount: function() {
    $http.get('/api/photos', null, function(res) {
      this.setState({photos: res});
    }.bind(this));

    $http.get('/api/photos/starred', null, function(res) {
      this.setState({starred: res});
    }.bind(this));

    this.listenTo(pubsub, 'general:scroll', this.loadMore);
  },

  loadMore: function(e) {
    if (e) e.preventDefault();
    var skip = this.state.skip + 5;
    var data = {photosSkip: skip};
    var newPhotos;
    $http.get('/api/photos', data, function(res) {
      newPhotos = this.state.photos.concat(res);
      this.setState({photos: newPhotos});
    }.bind(this));

    this.state.skip = skip;
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
        {starred}
        {photoNodes}

      </div>
    );
  }
});