'use strict';
var React = require('react');
var Map = require('views/photos/map.jsx');
var $http = require('utils/http');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      locations: []
    };
  },

  componentDidMount: function(){
    $http.get('/api/photos/locations', null, function(res) {
      this.setState({locations: res});
    }.bind(this));
  },

  render: function(){
    return (
      <div>
        <Map locations={this.state.locations} />
      </div>
    );
  }
});
