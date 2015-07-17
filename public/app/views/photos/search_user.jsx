'use strict';
var React = require('react');

module.exports = React.createClass({

  render: function() {
    var user = this.props.user;
    var urlProfileImage = 'https://s3-sa-east-1.amazonaws.com/instaproud/' + user.id + '/' + user.profile_image;
    var profileImage;

    if (user.profile_image) {
      profileImage = (<img src={urlProfileImage} />);
    } else {
      profileImage = (<img src={'images/placeholders/placeholder_profile.png'} />);
    }

    return (
      <li className="list-group-item search-user-profile">
        <a href={'#profile/' + user.username }>
          <span className="profile-image">
            {profileImage}
          </span>
          <p>{ user.username }</p>
          <p>{ user.name }</p>
        </a>
      </li>
    );
  }
});