'use strict';
var React = require('react');

module.exports = React.createClass({

  handleSelect: function(filter, e) {
    this.props.onAddFilter(filter);
  },

  render: function() {
    var filters= [
      'original',
      '1977',
      'brannan',
      'gotham',
      'hefe',
      'lordKelvin',
      'Nashville',
      'xpro',
      'inkwell'
    ];

    var filterNodes = filters.map(function(filter, i) {
      return (
        <li key={i} className="select-image" onClick={this.handleSelect.bind(null, filter)}>
          <img src={'images/placeholders/placeholder_' + filter +'.jpeg'} className="load-image"  width="50" heigh="50" />
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