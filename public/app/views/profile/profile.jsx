'use strict';
var React = require('react');
var Header = require('views/profile/profile_header.jsx');
var Grid = require('views/profile/profile_grid.jsx');
var urls = require('config/urls');
var $  = require('jquery');
var $http = require('utils/http');
var Waypoint = require('react-waypoint');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      user: {},
      photos: [],
      photosCount: 0,
      skip: 0,
      hasMore: true
    }
  },

  fetchUser: function(username) {
    $http.get('/api/users/' + username + '/profile', null, function(res) {
      if (res) {
        this.setState({
        user: res.user,
        photosCount: res.photosCount
      });
      }

    }.bind(this));
  },

  fetchPhotos: function(username) {
    $http.get('/api/users/' + username + '/photos', null, function(res) {
      if (res) {
        this.setState({
         photos: res
        });
      }
    }.bind(this));
  },

  loadMore: function() {
     var skip = this.state.skip + 12;
    var data = {photosSkip: skip};
    var hasMore = this.state.hasMore;
    var newPhotos;

    if (hasMore) {
      $http.get(
        '/api/users/' + this.props.username + '/photos',
        data,
        function(res) {
        if (res && res.length === 0) {
          this.setState({hasMore: false});
        }

        if (res) {
          newPhotos = this.state.photos.concat(res);
          this.setState({photos: newPhotos});
        }
      }.bind(this));
      this.state.skip = skip;
    }
  },

  componentDidMount: function() {
    this.fetchUser(this.props.username);
    this.fetchPhotos(this.props.username);
  },

  render: function() {
    return (
      <div className="profile-page">
        <Header
          user={this.state.user}
          photosCount={this.state.photosCount}
          prefix="photos"
        />
        <Grid photos={this.state.photos} />
        <Waypoint
          onEnter={this.loadMore}
          threshold={0.2}
        />
      </div>
    );
  }
});