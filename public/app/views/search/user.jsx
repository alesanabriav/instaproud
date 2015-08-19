'use strict';
var React = require('react');
var ProfileImage = require('components/profile_image.jsx');

module.exports = React.createClass({

  render: function() {
    var user = this.props.user;

    return (
      <li className="list-group-item search-user-profile">
        <a href={'#profile/' + user.username }>
            <ProfileImage user={user} containerName="profile-image" />
          <p>{ user.username }</p>
          <p>{ user.name }</p>
        </a>
      </li>
    );
  }
});