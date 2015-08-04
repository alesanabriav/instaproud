'use strict';
var React = require('react');
var loadImages = require('utils/loadImages');
var ImageLoader = require('react-imageloader');

module.exports = React.createClass({

  preloader: function() {
    return (
      <img src="images/photo-placeholder.gif" alt="Loading icon" />
      );
  },

  render: function() {
    var photo = this.props.photo;
    var src = 'https://s3-sa-east-1.amazonaws.com/bvcinstaproud/' + photo.owner + '/' + photo.path;

    return (
      <a href={"#photo/" + photo.id} className="col-xs-4">
       <ImageLoader
            src={src}
            preloader={this.preloader}>
            Fallo!
          </ImageLoader>
      </a>
    );
  }
});