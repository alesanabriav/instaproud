'use strict';
var React = require('react');
var ImageLoader = require('react-imageloader');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      user: {},
      class: ''
    }
  },

  preloader: function() {
    return (
      <img src="images/profile-placeholder.png" alt="Loading icon" />
      );
  },

  render: function() {
    var user = this.props.user;
    var profileImage;
    var src = 'https://s3-sa-east-1.amazonaws.com/bvcinstaproud/' + user.id + '/' + user.profile_image;

    return (
      <div className={this.props.containerName}>
        <ImageLoader
            src={src}
            preloader={this.preloader}
            >
            {this.preloader()}
          </ImageLoader>
      </div>
    );
  }
});