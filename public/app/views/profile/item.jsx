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

  fetchUser: function(username, prefix) {
    $.get(urls.baseUrl + '/api/users/' + username + '/' + prefix)
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
      url: urls.baseUrl + '/api/users/' + this.props.username + '/' + this.props.prefix,
      method: 'GET',
      data: {photosSkip: skip}
    })
    .then(function(res) {
      this.setState({
        photos: _.union(photos, res.photos)
      });
    }.bind(this));

    this.setState({
      skip: skip
    });
  },

  componentDidMount: function() {
    this.fetchUser(this.props.username, this.props.prefix);
    this.listenTo(pubsub, 'general:scroll', this.loadMore);
  },

  componentWillReceiveProps: function(props) {
    this.fetchUser(props.username, props.prefix);
  },

  render: function() {
    return (
      <div className="profile-page">
        <Header user={this.state.user} photos={this.state.photos} prefix={this.props.prefix} />
        <Grid photos={this.state.photos} />
      </div>
    );
  }
});