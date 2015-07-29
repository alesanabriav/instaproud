'use strict';
var React = require('react');
var $ = require('jquery');
var $http = require('utils/http');
var Comments = require('views/photos/item_comments.jsx');
var CommentForm = require('views/photos/item_comment_form.jsx');
var ProfileImage = require('components/profile_image.jsx');
var Timeago = require('components/timeago.jsx');
var ButtonLike = require('components/button_like.jsx');
var pubsub = require('utils/pubsub');
var dropdown = require('semantic-ui-dropdown/dropdown');
require('semantic-ui-transition/transition');
var ImageLoader = require('react-imageloader');

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
      taggedCount: photo.taggedCount,
      show: true
    }
  },

  componentDidMount: function() {
    $('.ui.dropdown').dropdown();
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
        });
        pubsub.trigger('activity:store', {text: 'comento: ' + comment.text, photo: this.props.photo.id});
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

        pubsub.trigger('activity:delete', {text: 'le gusta', photo: this.props.photo.id});
    }.bind(this));
  },

  handleDelete: function(e) {
    e.preventDefault();
    $http.delete('/api/photos/' + this.props.photo.id);
    this.setState({show: false});
  },

  handleReport: function(e) {
    e.preventDefault();
    $http.post('/api/photos/'+ this.props.photo.id + '/report', null, function(res) {
      console.log(res);
    });
  },

  handleFixed: function(e) {
     e.preventDefault();
    $http.post('/api/photos/'+ this.props.photo.id + '/starred', null, function(res) {
      console.log(res);
    });
  },

  preloader: function() {
    return (
      <img src="images/photo-placeholder.gif" alt="Loading icon" />
      );
  },

  render: function() {
    var photo = this.props.photo;
    var caption = '';
    var user = photo.owner;
    var userlogged = JSON.parse(localStorage.getItem('user'));
    var optionDelete;
    var optionFixed;

    if (photo.caption) {

      caption = photo.caption.replace(/#(\S+)/g, '<a href="#hashtag/$1">#$1</a>').replace(/@(\S+)/g, '<a href="#tagged/$1">@$1</a>');
    }

    if (userlogged.id === user.id || userlogged.role === 'admin') {
      optionDelete = (<a href="#" className="item" onClick={this.handleDelete}>Eliminar</a>);
    }

    if (userlogged.role === 'admin') {
      optionFixed = (<a href="#" className="item" onClick={this.handleFixed}>Establecer</a>);
    }

    var src = 'https://s3-sa-east-1.amazonaws.com/instaproud/' + user.id + '/' + photo.path;

    var profileImage;

    return (
      <article className={this.state.show ? "photo-feed": "hidden"}>
        <header className="header">
        <ProfileImage user={user} containerName="avatar-container" />

          <div className="owner-username-and-name">
            <a className="profile_link" href={"#profile/" + user.username}>{user.name}</a>
            <span className="area">{user.area}</span>
          </div>

          <Timeago date={photo.created} />

        </header>
        <div className="photo-container">
          <ImageLoader
            src={src}
            preloader={this.preloader}>
            Fallo!
          </ImageLoader>
        </div>
        <div className="info">

          <div className="buttons-like-and-comment">

            <ButtonLike users={this.state.liked} onLike={this.handleLike} onUnlike={this.handleUnlike} />

            <button className="comment-focus" onclick={this.commentFocus}><i className="icon ion-ios-chatbubble-outline"></i></button>

             <div className="ui dropdown float-right">
            <i className="icon ion-ios-more"></i>
            <div className="menu">
              <a href="#" className="item" onClick={this.handleReport}>Reportar</a>
              {optionDelete}
              {optionFixed}
          </div>
          </div>
          </div>

          <div className="counters">
            <span className="likes-count"><i className="icon ion-ios-heart"></i> {this.state.likesCount}</span>

              <span className="comments-count"><i className="icon ion-ios-chatbubble"></i> {this.state.commentsCount}</span>

              <span className="tagged-count"><i className="icon ion-ios-person"></i> {this.state.taggedCount}</span>
          </div>

          <span dangerouslySetInnerHTML={{__html:caption}} />

          <Comments comments={this.state.comments} id={photo.id} />

          <CommentForm onSubmitComment={this.handleComment} onTagUser={this.handleTag} />

        </div>
      </article>
    );
  }
});
