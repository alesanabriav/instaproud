'use strict';
var React = require('react');
var Header = require('views/profile/profile_header.jsx');
var Grid = require('views/profile/profile_grid.jsx');
var urls = require('config/urls');
var $  = require('jquery');
var pubsub = require('utils/pubsub');
var listenTo = require('react-listenTo');
var _ = require('underscore');

module.exports = React.createClass({
  mixins: [listenTo],

  getInitialState: function() {
    return {
      user: {},
      photos: [],
      skip: 0
    }
  },

  fetchUser: function(username) {
    $.get(urls.baseUrl + '/api/users/' + username + '/tagged')
    .then(function(res) {
      this.setState({
        user: res.user,
        photos: res.photos
      });
    }.bind(this));
  },

  loadMore: function(e) {
    if (e) e.preventDefault();
    var photosSkip = this.state.skip;
    var skip = photosSkip + 12;
    var photos = this.state.photos;

    $.ajax({
      url: urls.baseUrl + '/api/users/' + this.props.username + '/tagged',
      method: 'GET',
      data: {photosSkip: skip}
    })
    .then(function(res) {
      var newPhotos = this.state.photos.concat(res.photos);
      this.setState({
        photos: newPhotos
      });
    }.bind(this));

    this.setState({
      skip: skip
    });
  },

  componentDidMount: function() {
    this.listenTo(pubsub, 'general:scroll', this.loadMore);
    this.fetchUser(this.props.username);
  },

  render: function() {
    return (
      <div className="profile-page">
        <Header user={this.state.user} photos={this.state.photos} prefix="tagged" />
        <Grid photos={this.state.photos} />
      </div>
    );
  }
});