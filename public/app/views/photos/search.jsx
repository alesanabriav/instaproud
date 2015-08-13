'use strict';
var React = require('react');
var $ = require('jquery');
var urls = require('config/urls');
var Hashtag = require('views/photos/search_hashtag.jsx');
var User = require('views/photos/search_user.jsx');
var Typeahead = require('react-typeahead').Typeahead;

module.exports = React.createClass({
  getInitialState: function() {
    return {
      hashtags: [],
      users: [],
      searchType: 'hashtags',
      searchText: 'Buscar por hashtag'
    }
  },

  componentDidMount: function() {
    $.get('/api/hashtags', null, function(hashtags) {
      this.setState({
        hashtags: hashtags,
        users: []
      });
    }.bind(this));
  },

  searchHashtags: function(query) {
    $.get(urls.baseUrl+"/api/hashtags/"+ query)
    .then(function(res) {
      this.setState({
        hashtags: res,
        users: []
      });
    }.bind(this));
  },

  searchUsers: function(query) {
    $.get(urls.baseUrl + '/users/search/' + query)
    .then(function(res) {
      this.setState({
        users: res,
        hashtags: []
      });
    }.bind(this));
  },

  handleChange: function(e) {
    var query = React.findDOMNode(this.refs.query).value;

    if (query.length >= 2) {
      if (this.state.searchType === 'hashtags') {
        this.searchHashtags(query);
      } else {
        this.searchUsers(query);
      }
    }
  },

  changeUserType: function(e) {
    this.setState({
      searchType: 'users',
      searchText: 'Buscar por usuario'
    });
    this.handleChange();
    e.preventDefault();
  },

  changeHashtagType: function(e) {
    this.setState({
      searchType: 'hashtags',
      searchText: 'Buscar por hashtag'
    });
    this.handleChange();
    e.preventDefault();
  },

  render: function() {
    var hashtagActive = '';
    var userActive = '';

    if (this.state.searchType === 'hashtags') {
      hashtagActive = 'active';
    } else {
      userActive = 'active';
    }

    var classes = {
      input: "form-control autocomplete",
      results: 'list-group',
      listItem: 'list-group-item',
      token: 'btn btn-primary btn-sm'
    };

    return (
      <div className="search-hastag-or-users">

        <input type="text" ref="query" className="search form-control" placeholder={this.state.searchText} onChange={this.handleChange} />

        <ul className="options">
          <li>
            <a onClick={this.changeHashtagType} className={"btn " + hashtagActive}>
              <i className="icon ion-pound"></i> <span>Hashtags</span>
            </a>
          </li>

          <li>
            <a onClick={this.changeUserType} className={"btn " + userActive}>
              <i className="icon ion-ios-people-outline"></i> <span>Usuarios</span>
            </a>
          </li>
        </ul>

        <ul className="search-autocomplete list-group">
          {this.state.hashtags.map(function(data, i) {
            return (<Hashtag hashtag={data} key={i} />)
          })}

          {this.state.users.map(function(data, i) {
            return (<User user={data} key={i} />)
          })}
        </ul>
      </div>
    );
  }
});