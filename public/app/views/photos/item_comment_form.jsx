'use strict';
var React = require('react');
var $http = require('utils/http');
var _ = require('underscore');
var pubsub = require('utils/pubsub');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      users: []
    }
  },

  submitComment: function(e) {
    e.preventDefault();
    pubsub.trigger('input:onFocusOut');
    var text = React.findDOMNode(this.refs.comment).value;
    this.props.onSubmitComment({text: text});
    React.findDOMNode(this.refs.comment).value = '';
  },

  searchUsers: function() {
    pubsub.trigger('input:onFocus');
    var text = React.findDOMNode(this.refs.comment).value;
    var tags = text.match(/\@\w+\b/gm);
    var tagsWithSpace = text.match(/\@\w+\b\s/gm);
    var lastWithSpace = _.findLastIndex(tagsWithSpace);
    var last = _.findLastIndex(tags);
    var query = '';
    var queryWithSpace = '';
    var search = true;

    if (last !== -1) {
     query = tags[last].replace('@', '');
    }

    if (last !== -1 && lastWithSpace !== -1) {
      if (tagsWithSpace[lastWithSpace].match(/\@\w+\b/gm) == tags[last]) {
        search = false;
      }
    }

    if (text.length === 0) {
      this.setState({
        users: []
      });
    }

    if (query && query.length >= 2 && search) {
      $http.get(
        '/users/search/' + query,
        null,
        function(res) {
          this.setState({
            users: res
          });
        }.bind(this));
    }
  },

  handleTag: function(user, e) {
    e.preventDefault();
    var text = React.findDOMNode(this.refs.comment).value;
    var tags = text.match(/\@\w+\b/gm);
    var last = _.findLastIndex(tags);
    var query = text.replace(tags[last], "@" + user.username + " ");
    React.findDOMNode(this.refs.comment).value = query;
    React.findDOMNode(this.refs.comment).focus();

    this.setState({
      users: []
    });
  },

  render: function() {
    var userNodes = this.state.users.map(function(user) {
      return (
        <li key={user.id} className="list-group-item">
          <a href={"#"} onClick={this.handleTag.bind(null, user)}>{user.username}</a>
        </li>
      );
    }.bind(this));

    return (
      <div>
        <form className="input-group comment-create-container" onSubmit={this.submitComment}>
          <input type="text" ref="comment" onChange={this.searchUsers} className="form-control commentText" placeholder="Comentar" />
          <span className="input-group-btn">
            <button className="comment btn"><i className="icon ion-ios-arrow-right"></i></button>
          </span>
        </form>

        <ul className="list-group">{userNodes}</ul>
      </div>
    );
  }
});
