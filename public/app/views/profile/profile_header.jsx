'use strict';
var React = require('react');
var ProfileImage = require('components/profile_image.jsx');

module.exports = React.createClass({

  render: function() {
    var user = this.props.user;
    var userlogged = JSON.parse(localStorage.getItem('user'));
    var profileEdit;

    if (this.props.prefix && this.props.prefix === 'photos') {
      var yourPhotos = 'active';
    } else {
      var tagged = 'active';
    }

    if (userlogged.id === user.id) {
      profileEdit = (
        <a href={'#profile/' + user.id + '/edit'} className="btn">
          <i className="icon ion-ios-gear-outline"></i>
        </a>
      );
    }

    return (
      <div className="profile-page">
      <header>
        <ProfileImage user={user} containerName="profile-image" />

        <ul className="profile-info">
          <li className="user-name">{user.name}</li>
          <li className="user-area">{user.area}</li>
          <li className="user-area">{user.email}</li>
        </ul>

        <div className="count">
          <span className="divider"></span>
            <span className="photos-count"><span className="count-num">{this.props.photosCount}</span><br /> Fotos</span>
          </div>
        <p className="bio">{user.bio}</p>
        <ul className="profile-actions">
          <li>
            <a href={'#profile/' + user.username} className={"btn " + yourPhotos}>
              <span className="icon ion-ios-photos-outline"></span> <span className="text"></span>
            </a>
          </li>
          <li>
          <a href={'#tagged/' + user.username} className={"btn " + tagged}>
              <i className="icon ion-ios-pricetags-outline"></i> <span className="text"></span>
            </a>
          </li>
          <li>{profileEdit}</li>
        </ul>
      </header>
      </div>
    );
  }
});