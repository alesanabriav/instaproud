'use strict';
var React = require('react');
var moment = require('moment');
var Item = require('views/activities/item.jsx');
var $http = require('utils/http');
var urls = require('config/urls');
var io = require('socket.io-client/socket.io.js');
var socket = io(urls.baseUrl + '/activities');
var _ = require('underscore');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      activities: []
    }
  },

  componentDidMount : function() {
    socket.on('new', function(data) {
      console.log(data);
      this.setState({
        activities: _.union([data], this.state.activities)
      });
    }.bind(this));

    $http.get('/api/activities', null, function(res) {
      this.setState({
        activities: res
      });
    }.bind(this));
  },

  componentWillUnmount: function() {
    socket.removeListener()
  },

  render: function() {
    return (
      <ul className="list-group">
        {this.state.activities.map(function(data) {
          return (<Item activity={data} key={data.id} />)
        })}
      </ul>
    );
  }
});
