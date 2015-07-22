'use strict';
var React = require('react');
var $http = require('utils/http');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      users: []
    }
  },

  submitComment: function(e) {
    e.preventDefault();
    var text = React.findDOMNode(this.refs.comment).value;
    this.props.onSubmitComment({text: text});
    React.findDOMNode(this.refs.comment).value = '';
  },

  searchUsers: function() {
    var text = React.findDOMNode(this.refs.comment).value;
    var patt = /@(\S+)/g;

    var query = text.replace('@', '');
    if (text.length === 0) {
      this.setState({
        users: []
      });
    }

    if (patt.test(text) && text.length >= 2 && text.indexOf(' ') < 0) {
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
    this.setState({
      users: []
    });

    React.findDOMNode(this.refs.comment).value = "@" + user.username + " ";
    React.findDOMNode(this.refs.comment).focus();
    this.props.onTagUser({tagged: user.id});
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
          <input type="text" ref="comment" onChange={this.searchUsers} className="form-control commentText" placeholder="Comentar..." />
          <span className="input-group-btn">
            <button className="comment btn"><i className="icon ion-ios-paperplane-outline"></i></button>
          </span>
        </form>

        <ul className="list-group">{userNodes}</ul>
      </div>
    );
  }
});
