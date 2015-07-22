'use strict';
var React = require('react');
var Comments = require('views/photos/item_comments.jsx');
var CommentForm = require('views/photos/item_comment_form.jsx');
var ProfileImage = require('components/profile_image.jsx');
var Timeago = require('components/timeago.jsx');
var _ = require('underscore');
var loadImages = require('utils/loadImages');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      photo: {
        caption: '',
        liked: [],
        comments: []
      }
    }
  },

  componentDidMount: function() {
    loadImages();
  },

  checkLiked: function() {
    var user = JSON.parse(localStorage.getItem('user'));
    var username = {username: user.username};
    var users = this.props.photo.attributes.liked;

    if (_.where(users, username).length > 0) {
      return (<button className="unlike"><i className="icon ion-ios-heart"></i></button>)
    } else {
      return (<button className="like"><i className="icon ion-ios-heart-outline"></i></button>);
    }
  },

  render: function() {
    var photo = this.props.photo.attributes;
    var caption = '';
    var user = photo.owner;


    if (photo.caption) {
      caption = photo.caption.replace(/#(\S+)/g, '<a href="#hashtag/$1">#$1</a>').replace(/@(\S+)/g, '<a href="#profile/$1">@$1</a>');
    }

    var src = 'https://s3-sa-east-1.amazonaws.com/instaproud/' + user.id + '/' + photo.path;

    var profileImage;

    return (
      <article className="photo-feed">
        <header className="header">
        <ProfileImage user={user} containerName="avatar-container" />
          <div className="owner-username-and-name">
            <a className="profile_link" href={"#profile/" + user.username}>
              {user.name}
            </a>
            <span className="area">{user.area}</span>
          </div>
          <Timeago date={photo.created} />

        </header>

        <div className="photo-container">
          <img className="photo-image b-lazy"
          src={'images/photo-placeholder.gif'}
          data-src={src} />
        </div>

        <div className="info">

          <div className="buttons-like-and-comment">
            { this.checkLiked() }
            <button className="comment-focus" onclick={this.commentFocus}><i className="icon ion-ios-chatbubble-outline"></i></button>
          </div>

          <div className="counters">
            <span className="likes-count"><i className="icon ion-ios-heart"></i> {photo.likesCount}</span>

              <span className="comments-count"><i className="icon ion-ios-chatbubble"></i> {photo.commentsCount}</span>
          </div>
          {caption}

          <Comments comments={photo.comments} />

          <CommentForm />

        </div>
      </article>

    );
  }
});