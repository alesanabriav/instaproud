'use strict';
var React = require('react');
var moment = require('moment');
require('moment/locale/es');

module.exports = React.createClass({

  render: function() {
    var profileImage;
    var activity = this.props.activity.attributes;
    var created = moment(activity.created).fromNow();
    var urlProfileImage = 'https://s3-sa-east-1.amazonaws.com/instaproud/' + activity.from.id + '/' +
    activity.from.profile_image;

    var photo = 'https://s3-sa-east-1.amazonaws.com/instaproud/' + activity.from.id + '/' +
    activity.photo.path;

    if (activity.from.profile_image) {
      profileImage = (<img src={urlProfileImage} />);
    } else {
      profileImage = (<img src={'images/placeholders/placeholder_profile.png'} />);
    }

    return (
      <div className="activity-item">
        <div className="media">
          <div className="media-body">
            <span className="profile-image"> {profileImage} </span>
            <a href={'#profile/' + activity.from.username }>{ activity.from.name }</a>
            { activity.text } <span className="timeago">{ created }</span>
          </div>
          <div className="media-right">
            <a href={'#photo/' + activity.photo.id }>
              <img src={ photo } width="40" />
            </a>
          </div>
        </div>
      </div>
    );
  }
});