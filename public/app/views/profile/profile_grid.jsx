'use strict';
var React = require('react');
var Photo = require('views/profile/grid_image.jsx');

module.exports = React.createClass({

  render: function() {
    var photoNodes = this.props.photos.map(function(photo, i) {
      return <Photo key={photo.id} photo={photo} />
    });

    return (
      <div className="photos-grid">
        <div className="row">
          {photoNodes}
        </div>
      </div>
    );
  }
});
