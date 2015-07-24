'use strict';
var React = require('react');
var loadImages = require('utils/loadImages');

module.exports = React.createClass({
  componentDidMount: function() {
    loadImages();
  },

  render: function() {
    var photo = this.props.photo;
    var src = 'https://s3-sa-east-1.amazonaws.com/instaproud/' + photo.owner + '/' + photo.path;

    return (
      <a href={"#photo/" + photo.id} className="col-xs-4">
        <img src={"images/photo-placeholder.gif"} data-src={src} className="box"/>
      </a>
    );
  }
});