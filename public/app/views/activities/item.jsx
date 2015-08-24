'use strict';
var React = require('react');
var ProfileImage = require('components/profile_image.jsx');
var Timeago = require('components/timeago.jsx');
var ImageLoader = require('react-imageloader');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      activity: {
        photo: {path: ''}
      }
    }
  },

  preloader: function() {
    return (
      <img src="images/photo-placeholder.gif" />
    );
  },

  render: function() {
    var profileImage;
    var activity = this.props.activity;
    var photo;
    var photoLink;

    if (activity.photo) {
      photo = 'https://s3-sa-east-1.amazonaws.com/bvcinstaproud/' + activity.photo.owner + '/' +
    activity.photo.path;
      photoLink = '#photo/' + activity.photo.id
    }

    return (
      <div className="activity-item">
        <div className="media">
          <div className="media-body">
            <ProfileImage user={activity.from} containerName="profile-image" />
            <a href={'#profile/' + activity.from.username }>{ activity.from.username }</a> { activity.text } <Timeago date={activity.created} />
          </div>

          <div className="media-right">
            <a href={photoLink}>
              <ImageLoader
              src={photo}
              preloader={this.preloader}>
              fallo!
              </ImageLoader>
            </a>
          </div>
        </div>
      </div>
    );
  }
});