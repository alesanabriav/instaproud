'use strict';
var React = require('react');
var moment = require('moment');
var Item = require('views/activities/item.jsx');
var $http = require('utils/http');
var urls = require('config/urls');
var _ = require('underscore');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      activities: []
    }
  },

  componentDidMount : function() {
    $http.get('/api/activities', null, function(res) {
      this.setState({
        activities: res
      });
    }.bind(this));
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
