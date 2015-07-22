'use strict';
var React = require('react');
var ProfileImage = require('components/profile_image.jsx');

module.exports = React.createClass({

  render: function() {
    var user = this.props.user;
    var photos = this.props.photos;
    var photosCount = photos.length;

    if (this.props.prefix && this.props.prefix === 'photos') {
      var yourPhotos = 'active';
    } else {
      var tagged = 'active';
    }

    return (
      <header>
        <ProfileImage user={user} containerName="profile-image" />

        <div className="profile-info">
          <span className="user-name">{user.name}</span>
          <br />
          <span className="user-area">{user.area}</span>

          <div className="count-and-edit">
            <span className="photos-count">{photosCount} Fotos</span>
          </div>
        </div>

        <div className="profile-actions">
          <a href={'#profile/' + user.username} className={"btn " + yourPhotos}>
            <span className="icon ion-ios-photos-outline"></span> <span className="text">Tus fotos</span>
          </a> <a href={'#tagged/' + user.username} className={"btn " + tagged}>
            <i className="icon ion-ios-pricetags-outline"></i> <span className="text">Etiquetado</span>
          </a> <a href={'#profile/' + user.id + '/edit'} className="btn">
            Editar perfil
          </a>

        </div>
      </header>
    );
  }
});