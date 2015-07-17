'use strict';
var React = require('react');
var Photo = require('views/profile/grid_image.jsx');

module.exports = React.createClass({

  render: function() {
    var photoNodes = this.props.photos.map(function(photo, i) {
    var src = 'images/photo-placeholder.gif';

    if (photo) {
      src = 'https://s3-sa-east-1.amazonaws.com/instaproud/' + photo.owner + '/' + photo.path;
    }

    return (
      <a key={i} href={"#photo/" + photo.id} className="col-lg-4 col-sm-4 col-md-4 col-xs-4">
        <img src={src} className="img-responsive"/>
      </a>
    );
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
