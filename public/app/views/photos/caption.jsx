'use strict';
var React = require('react');
var Geolocation = require('views/photos/geolocation.jsx');
var Tokenizer = require('react-typeahead').Tokenizer;
var $http = require('utils/http');
var _ = require('underscore');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      tokenizerOptions: []
    }
  },

  componentWillMount: function() {

  },

  handleSearch: function(e) {
    console.log(e);
    var users;
    var query = 'ale';
    $http.get('/users/search/' + query, null, function(res) {
      users = _.pluck(res, 'username');
      this.setState({
        tokenizerOptions: users
      });
    }.bind(this));
  },

  render: function() {
    var src = localStorage.getItem('filtered');
    var classes = {
      input: "form-control autocomplete",
      results: 'list-group',
      listItem: 'list-group-item',
      token: 'btn btn-primary btn-sm'
    };

    return (
      <section className="photo-caption">
        <div className="image-and-caption">
          <img src={src} width="100" />
          <textarea className="caption form-control" placeholder="Título"></textarea>
        </div>
      <p></p>
       <Tokenizer
          customClasses={classes}
          placeholder="Etiquetar personas"
          options={this.state.tokenizerOptions}
          onTokenAdd={function(token) {
            console.log('token added: ', token);
          }}
          onKeyUp={this.handleSearch}
        />
        <Geolocation />
      </section>
    );
  }
});