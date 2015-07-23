'use strict';
var React = require('react');
var Filters = require('views/photos/filter_filters.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      src: ''
    }
  },

  componentWillMount: function() {
    var src = localStorage.getItem('src');
    this.setState({
      src: src
    })
  },

  handleFilter: function() {

  },

  render: function() {
    return (
      <div>
    <div className="img-active">
      <img src={this.state.src} className="img-responsive" />
    </div>
    <Filters onAddFilter={this.handleFilter} />
    </div>
    );
  }
});