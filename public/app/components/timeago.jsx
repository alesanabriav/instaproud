'use strict';
var React = require('react');
var moment = require('moment');
require('moment/locale/es');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      date: Date.now()
    }
  },

  render: function() {
    var created = moment(this.props.date).fromNow();
    return (
       <span className="timeago" >{created}</span>
    );
  }
});