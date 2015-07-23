'use strict';
var React = require('react');
var ProfileImage = require('components/profile_image.jsx');
var Timeago = require('components/timeago.jsx');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      activity: {
        photo: {path: ''}
      }
    }
  },

  render: function() {
    var profileImage;
    var activity = this.props.activity.attributes;
    var photo;
    var photoLink;

    if (activity.photo) {
      photo = 'https://s3-sa-east-1.amazonaws.com/instaproud/' + activity.from.id + '/' +
    activity.photo.path;
      photoLink = '#photo/' + activity.photo.id
    }

    return (
      <div className="activity-item">
        <div className="media">
          <div className="media-body">
            <ProfileImage user={activity.from} containerName="profile-image" />
            <a href={'#profile/' + activity.from.username }>{ activity.from.name }</a> { activity.text } <Timeago date={activity.created} />
          </div>
          <div className="media-right">
            <a href={photoLink}>
              <img src={ photo } width="40" />
            </a>
          </div>
        </div>
      </div>
    );
  }
});