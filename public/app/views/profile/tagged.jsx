'use strict';
var React = require('react');
var Header = require('views/profile/profile_header.jsx');
var Grid = require('views/profile/profile_grid.jsx');
var _ = require('underscore');
var $http = require('utils/http');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      user: {},
      photos: [],
      skip: 0,
      photosCount: 0,
      hasMore: true
    }
  },

  fetchUser: function(username) {
    $http.get('/api/users/' + username + '/profile', null, function(res) {
      this.setState({
        user: res.user,
        photosCount: res.photosCount
      });
    }.bind(this));
  },

  fetchTagged: function(username) {
    $http.get('/api/users/' + username + '/tagged', null, function(res) {
      this.setState({
        photos: res
      });
    }.bind(this));
  },

  loadMore: function() {
     var skip = this.state.skip + 12;
    var data = {photosSkip: skip};
    var hasMore = this.state.hasMore;
    var newPhotos;

    if (hasMore) {
      $http.get('/api/users/' + this.props.username + '/tagged', data, function(res) {
        if (res.length === 0) {
          this.setState({hasMore: false});
        }
        newPhotos = this.state.photos.concat(res);
        this.setState({photos: newPhotos});
      }.bind(this));
      this.state.skip = skip;
    }
  },

  componentDidMount: function() {
    this.fetchUser(this.props.username);
    this.fetchTagged(this.props.username);
  },

  render: function() {
    return (
      <div className="profile-page">
        <Header user={this.state.user} photosCount={this.state.photosCount} prefix="tagged" />
        <Grid photos={this.state.photos} />
      </div>
    );
  }
});