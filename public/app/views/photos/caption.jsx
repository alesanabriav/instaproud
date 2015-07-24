'use strict';
var React = require('react');
var Geolocation = require('views/photos/geolocation.jsx');
var Tokenizer = require('react-typeahead').Tokenizer;
var $http = require('utils/http');
var _ = require('underscore');
var pubsub = require('utils/pubsub');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      tokenizerOptions: [],
      users: [],
      location: {},
      tagged: []
    }
  },

  componentWillMount: function() {

  },

  handleSearch: function(e) {
    var users;
    var query = 'ale';
    $http.get('/users/search/' + query, null, function(res) {
      users = _.pluck(res, 'username');
      this.setState({
        tokenizerOptions: users,
        users: res
      });
    }.bind(this));
  },

  handleTokenAdd: function(token) {
    var user = _.where(this.state.users, {username: token});
    var id = user[0].id.replace("", '');
    var tagged = this.state.tagged.concat([id]);
    this.setState({
      tagged: tagged
    });
  },

  handleTokenRemove: function(token) {
    var user = _.where(this.state.users, {username: token});
    var tagged = _.without(this.state.tagged, user[0].id);
    this.setState({
      tagged: tagged
    });
  },

  handleLocation: function(location) {
    this.setState({
      location: location
    })
  },

  handleNext: function(e) {
    e.preventDefault();
    var image = localStorage.getItem('filtered').match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)[2];
    var caption = React.findDOMNode(this.refs.caption).value;
    var location = this.state.location;
    var users = this.state.tagged;

    var data = {
      image: image,
      caption: caption,
      geolocation: JSON.stringify(location),
      tagged: JSON.stringify(users)
    };

    $http.post('/api/photos', data, function(res) {
      pubsub.trigger('navigator:change', '/');
    }.bind(this));
  },

  storeTagged: function(photo) {
    _.each(this.state.tagged, function(tag) {
      $http.post('/api/photos/' + photo.id + '/tagged', {tagged: tag}, function() {

      });
    });
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
          <ul className="caption-options">
          <li><a href="#filter"><i className="icon ion-ios-arrow-back"></i></a></li>
            <li>Compartir Imagen</li>
            <li><a href="#" onClick={this.handleNext}><i className="icon ion-ios-arrow-forward"></i></a></li>
          </ul>
          <textarea ref="caption" className="caption form-control" placeholder="Título"></textarea>
        </div>
      <p></p>

       <Tokenizer
          customClasses={classes}
          placeholder="Etiquetar personas"
          options={this.state.tokenizerOptions}
          onTokenAdd={this.handleTokenAdd}
          onTokenRemove={this.handleTokenRemove}
          onKeyUp={this.handleSearch}
        />
        <Geolocation onLocation={this.handleLocation}/>
      </section>
    );
  }
});