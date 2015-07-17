'use strict';
var React = require('react');
var Header = require('views/profile/profile_header.jsx');
var Grid = require('views/profile/profile_grid.jsx');
var urls = require('config/urls');
var $  = require('jquery');
var pubsub = require('utils/pubsub');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: {},
      photos: []
    }
  },

  fetchUser: function(username) {
    $.get(urls.baseUrl + '/api/users/' + username +'/photos')
    .then(function(res) {
      this.setState({
        user: res.user,
        photos: res.photos
      });
    }.bind(this));
  },

  loadMore: function(e) {
    if (e) e.preventDefault();
    var photosSkip = 0;
    var skip = photosSkip + 1;

    $.ajax({
      url: urls.baseUrl + '/api/users/' + this.props.username + '/photos',
      method: 'GET',
      data: {photosSkip: skip}
    })
    .then(function(res) {
      this.setState({
        photos: res.photos
      });
    }.bind(this));

    photosSkip = skip;
  },

  componentDidMount: function() {
    this.fetchUser(this.props.username);
    pubsub.on('general:scroll', this.loadMore);
  },

  componentWillReceiveProps: function(props) {
    this.fetchUser(props.username);
  },

  render: function() {
    return (
      <div className="profile-page">
        <Header user={this.state.user} photos={this.state.photos} />
        <Grid photos={this.state.photos} />
      </div>
    );
  }
});