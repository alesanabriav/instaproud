'use strict';
var React = require('react');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      user: {},
      class: ''
    }
  },

  render: function() {
    var user = this.props.user;
    var profileImage;
    var urlProfileImage = 'https://s3-sa-east-1.amazonaws.com/instaproud/' + user.id + '/' + user.profile_image;

    if (user && user !== '') {
      profileImage = (<img src={urlProfileImage} />);
    } else {
      profileImage = (<img src={'images/placeholders/placeholder_profile.png'} />);
    }

    return (
      <div className={this.props.containerName}>
        {profileImage}
      </div>
    );
  }
});