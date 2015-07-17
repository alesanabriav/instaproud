'use strict';
var React = require('react');
var moment = require('moment');
var models = require('models/activity');
var Item = require('views/activities/item.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      activities: []
    }
  },

  componentDidMount : function() {
    var _this = this;
    var collection = new models.activities();
    collection.fetch({success: function(activities) {
      _this.setState({
        activities: activities
      });
    }});
  },

  render: function() {
    return (
      <ul className="list-group">
        {this.state.activities.map(function(data, i) {
          return (<Item activity={data} key={i} />)
        })}
      </ul>
    );
  }
});
