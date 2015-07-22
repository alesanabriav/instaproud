'use strict';
var React = require('react');
var $http = require('utils/http');
var Comments = require('views/photos/item_comments.jsx');
var CommentForm = require('views/photos/item_comment_form.jsx');
var ProfileImage = require('components/profile_image.jsx');
var Timeago = require('components/timeago.jsx');
var ButtonLike = require('components/button_like.jsx');
var loadImages = require('utils/loadImages');
var pubsub = require('utils/pubsub');

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

  getInitialState: function() {
    var photo = this.props.photo;
    return {
      comments: photo.comments,
      liked: photo.liked,
      likesCount: photo.likesCount,
      commentsCount: photo.commentsCount,
      taggedCount: photo.taggedCount
    }
  },

  componentDidMount: function() {
    loadImages();
  },

  handleComment: function(comment) {
    var newComments;
    $http.post(
      '/api/photos/' + this.props.photo.id + '/comments',
      {comment: comment.text},
      function(res) {
        newComments = this.state.comments.concat([res]);
        this.setState({
          comments: newComments,
          commentsCount: newComments.length
        })
    }.bind(this));
  },

  handleLike: function() {
    $http.post(
      '/api/photos/' + this.props.photo.id + '/liked',
      null,
      function(res) {
        this.setState({
          liked: res.liked,
          likesCount: res.likesCount
        });
        pubsub.trigger('activity:store', {text: 'le gusta', photo: this.props.photo.id});
    }.bind(this));
  },

  handleUnlike: function() {
    $http.post(
      '/api/photos/' + this.props.photo.id + '/unliked',
      null,
      function(res) {
        this.setState({
          liked: res.liked,
          likesCount: res.likesCount
        });
        pubsub.trigger('activity:store', {text: 'le gusta', photo: this.props.photo.id});
    }.bind(this));
  },

  handleTag: function(data) {
    $http.post(
      '/api/photos/' + this.props.photo.id + '/tagged',
      data,
      function(res) {
        this.setState({
          taggedCount: res.taggedCount
        });
    }.bind(this));
  },

  render: function() {
    var photo = this.props.photo;
    var caption = '';
    var user = photo.owner;

    if (photo.caption) {
      caption = photo.caption.replace(/#(\S+)/g, '<a href="#hashtag/$1">#$1</a>').replace(/@(\S+)/g, '<a href="#tagged/$1">@$1</a>');
    }

    var src = 'https://s3-sa-east-1.amazonaws.com/instaproud/' + user.id + '/' + photo.path;

    var profileImage;

    return (
      <article className="photo-feed">
        <header className="header">
        <ProfileImage user={user} containerName="avatar-container" />

          <div className="owner-username-and-name">
            <a className="profile_link" href={"#profile/" + user.username}>{user.name}</a>
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

            <ButtonLike users={this.state.liked} onLike={this.handleLike} onUnlike={this.handleUnlike} />
            <button className="comment-focus" onclick={this.commentFocus}><i className="icon ion-ios-chatbubble-outline"></i></button>
          </div>

          <div className="counters">
            <span className="likes-count"><i className="icon ion-ios-heart"></i> {this.state.likesCount}</span>

              <span className="comments-count"><i className="icon ion-ios-chatbubble"></i> {this.state.commentsCount}</span>

              <span className="tagged-count"><i className="icon ion-ios-pricetag"></i> {this.state.taggedCount}</span>
          </div>
          {caption}

          <Comments comments={this.state.comments} id={photo.id} />

          <CommentForm onSubmitComment={this.handleComment} onTagUser={this.handleTag} />
        </div>
      </article>
    );
  }
});
