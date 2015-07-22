'use strict';
var React = require('react');
var _ = require('underscore');
var $http = require('utils/http');

module.exports = React.createClass({
  handleLike: function() {
    this.props.onLike();
  },

  handleUnlike: function() {
    this.props.onUnlike();
  },

  render: function() {
    var user = JSON.parse(localStorage.getItem('user'));
    var username = {username: user.username};
    var users = this.props.users;

    if (_.where(users, username).length > 0) {
      var like = <button className="unlike" onClick={this.handleUnlike}><i className="icon ion-ios-heart"></i></button>;
    } else {
      var like = <button className="like" onClick={this.handleLike}><i className="icon ion-ios-heart-outline"></i></button>;
    }

    return (
      <div>
        {like}
      </div>
    );
  }
});