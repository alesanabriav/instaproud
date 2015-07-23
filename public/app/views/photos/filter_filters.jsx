'use strict';
var React = require('react');

module.exports = React.createClass({

  render: function() {
    var filters= [
      'original',
      'concentrate',
      'crossProcess',
      'herMajesty',
      'jarques',
      'love',
      'Nostalgia',
      'pinhole',
      'sunrise',
      'vintage'
    ];

    return (
      <div className="filters-frame">
        <ul className="slidee">
          {filters.map(function(filter, i) {
        return (<li key={i} className="select-image" data-filter="sunrise">
          <img src={'images/placeholders/placeholder_' + filter +'.jpeg'} className="load-image"  width="50" heigh="50" />
            <p>{filter}</p>
            </li>)
          })}
        </ul>
      </div>
    );
  }
});