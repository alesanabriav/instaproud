'use strict';
var React = require('react');
var Comments = require('views/photos/item_comments.jsx');
var CommentForm = require('views/photos/item_comment_form.jsx');
var _ = require('underscore');

module.exports = React.createClass({

  checkLiked: function() {
    var user = JSON.parse(localStorage.getItem('user'));

    var username = {username: user.username};

    if (_.where(users, username).length > 0) {
      return (<button className="unlike"><i className="icon ion-ios-heart"></i></button>)
    } else {
      return (<button className="like"><i className="icon ion-ios-heart-outline"></i></button>);
    }
  },

  render: function() {
    var photo = this.props.photo;
    var user = this.props.photo.owner;
    var likesCount = photo.likes.length;
    var commentsCount = photo.comments.length;
    var caption = photo.caption.replace(/#(\S+)/g, '<a href="#hashtag/$1">#$1</a>').replace(/@(\S+)/g, '<a href="#profile/$1">@$1</a>');

    var urlProfileImage = 'https://s3-sa-east-1.amazonaws.com/instaproud/' + user.id + '/' + user.profile_image;

    var src = 'https://s3-sa-east-1.amazonaws.com/instaproud/' + photo.owner + '/' + photo.path;

    var profileImage;

    if (user.profile_image) {
      profileImage = (<img src={urlProfileImage} />);
    } else {
      profileImage = (<img src={'images/placeholders/placeholder_profile.png'} />);
    }

    return (
      <article className="photo-feed">
        <header className="header">
          <div className="avatar-container">
            {profileImage}
          </div>

          <div className="owner-username-and-name">
            <a className="profile_link" href={"#profile/" + user.username}>
              {user.name}
            </a>
            <span className="area">{user.area}</span>
          </div>

          <span className="timeago" title={photo.created}>{photo.created}</span>
        </header>

        <div className="photo-container">
          <img className="photo-image b-lazy"
          src="{'images/photo-placeholder.gif'}"
          data-src="{src}" />
        </div>

        <div className="info">

          <div className="buttons-like-and-comment">
            { this.checked }
            <button className="comment-focus"><i className="icon ion-ios-chatbubble-outline"></i></button>

          </div>

          <div className="counters">
            <span className="likes-count"><i className="icon ion-ios-heart"></i>{likesCount}</span>

              <span className="comments-count"><i className="icon ion-ios-chatbubble"></i>{commentsCount}</span>
          </div>
          {caption}

          <Comments comments={photo.comments} />

          <CommentForm />

        </div>
      </article>

    );
  }
});