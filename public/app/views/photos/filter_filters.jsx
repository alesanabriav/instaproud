'use strict';
var React = require('react');
var photoFilters = require('utils/filters');
var Vintage = require('vintagejs/dist/vintage');
var $ = require('jquery');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      active: ''
    }
  },

  getDefaultProps: function() {
    return {
      filters: [
        'original',
        '1977',
        'brannan',
        'gotham',
        'hefe',
        'lordKelvin',
        'Nashville',
        'xpro',
        'inkwell'
      ]
    }
  },

  handleSelect: function(filter, e) {
    var containers = $('.select-image').removeClass('active');
    var container = $("#container-" + filter);
    container.addClass('active');
    this.props.onAddFilter(filter);
  },

  componentDidMount: function() {
      this.props.filters.forEach(function(filter) {
      var img = document.getElementById("filter-" + filter);

      var effect = {
       curves: photoFilters[filter]
      };

      new Vintage(img, null, effect);
      });
  },

  render: function() {
    var src = localStorage.getItem('srcThumb');
    var filterNodes = this.props.filters.map(function(filter, i) {
      return (
        <li key={i} id={"container-" + filter} className={"select-image"} onClick={this.handleSelect.bind(null, filter)}>
          <img
            src={src}
            id={"filter-" + filter}
            width="50"
          />
            <p>{filter}</p>
        </li>
      )
    }.bind(this));

    return (
      <div className="filters-frame">
        <ul className="slidee">
          {filterNodes}
        </ul>
      </div>
    );
  }
});