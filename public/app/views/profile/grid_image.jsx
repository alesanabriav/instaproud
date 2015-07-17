'use strict';
var React = require('react');

module.exports = React.createClass({

  render: function() {
    var photo = this.props.photo;
    var src = '';

    if (photo.src) {
      src = 'https://s3-sa-east-1.amazonaws.com/instaproud/' + photo.owner + '/' + photo.path;
    } else {
      src = 'images/photo-placeholder.gif';
    }

    return (
      <a href={"#photo/" + photo.id} className="col-lg-4 col-sm-4 col-md-4 col-xs-4">
        <img src={src} className="img-responsive"/>
      </a>
    );
  }
});