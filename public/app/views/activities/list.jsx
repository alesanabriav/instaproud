'use strict';
var React = require('react');
var moment = require('moment');
var Item = require('views/activities/item.jsx');
var $http = require('utils/http');
var urls = require('config/urls');
var _ = require('underscore');
var Waypoint = require('react-waypoint');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      activities: [],
      skip: -20,
      hasMore: true
    }
  },

  componentDidMount : function() {
    $http.get('/api/activities', null, function(res) {
      this.setState({
        activities: res
      });
    }.bind(this));
  },

  loadMore: function() {
    var skip = this.state.skip + 20;
    var data = {activitySkip: skip};
    var activities = this.state.activities;

    if (this.state.hasMore) {
      $http.get('/api/activities', data, function(res) {
        if (res.length === 0) {
          this.state.hasMore = false;
        }
        activities = activities.concat(res);
        this.setState({
        activities: activities
      });
      }.bind(this));

      this.state.skip = skip;
    }
  },

  render: function() {
    return (
      <ul className="list-group">
        {this.state.activities.map(function(data) {
          return (<Item activity={data} key={data.id} />)
        })}
        <Waypoint onEnter={this.loadMore} threshold={0.2} />
      </ul>
    );
  }
});
