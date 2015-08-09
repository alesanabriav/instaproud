'use strict';
var React = require('react');
var _ = require('underscore');
var $ = require('jquery');
var FormSelect = require('components/form_select.jsx');
var ProfileImage = require('components/profile_image.jsx');
var getInterval = require('utils/get_interval');
var $http = require('utils/http');
var pubsub = require('utils/pubsub');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: {}
    }
  },

  componentDidMount: function() {
    $http.get('/api/users/'+ this.props.userId, null, function(user) {
      this.setState({user: user});
    }.bind(this));
  },

  handleProfileImage: function(e) {
    var file = $(e.target)[0].files[0];
    var name = 'profile_image';
    var url = '/users/' + this.state.user.id + '/image';

    $http.upload(url, name, file, function(res) {
      this.setState({
        user: res
      });
    }.bind(this));
  },

  handleChange: function() {
    var user = {
      id: this.state.user.id,
      profile_image: this.state.user.profile_image,
      name: React.findDOMNode(this.refs.name).value,
      gender: React.findDOMNode(this.refs.gender.refs.select).value,
      birthday: {
        day: React.findDOMNode(this.refs.day.refs.select).value,
        month: React.findDOMNode(this.refs.month.refs.select).value,
        year: React.findDOMNode(this.refs.year.refs.select).value
      },
      area: React.findDOMNode(this.refs.area.refs.select).value,
      bio: React.findDOMNode(this.refs.bio).value
    };

    this.setState({user: user});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var user = this.state.user;
    $http.put('/api/users/' + user.id, user, function(res) {
      pubsub.trigger('navigator:change', '#profile/'+ res.username);
    });
  },

  render: function() {
    var day;
    var month;
    var year;
    var user = this.state.user;
    var gender = ['Masculino', 'Femenino'];
    var days = getInterval(1, 31);
    var months = getInterval(1, 12);
    var years = getInterval(1905, 1999, true);

    var areas = [
      'Mercadeo',
      'Corporativa',
      'Comercial',
      'Mercadeo y Producto',
      'Gestión de Proyectos',
      'Jurídica',
      'Presidencia',
      'Tecnología'
    ];

    if (user.birthday && user.birthday.day) {
      day = user.birthday.day;
    }
    if (user.birthday && user.birthday.month) {
      month = user.birthday.month;
    }

    if (user.birthday && user.birthday.year) {
      year = user.birthday.year;
    }

    return (
      <section className="profile-edit">
        <header>

          <ProfileImage user={user} containerName="profile-image" />

          <span className="edit-profile-img">
            <a href="#">Subir imagen de perfil</a>
            <input
              type="file"
              onChange={this.handleProfileImage}
              className="uploadPhoto"
              />
          </span>

        </header>

        <form onSubmit={this.handleSubmit}>

          <div className="form-group">
            <input
              ref="name"
              className="form-control"
              onChange={this.handleChange}
              placeholder="Nombre"
              value={user.name} />
          </div>

          <div className="form-group">
            <FormSelect
              ref="gender"
              options={gender}
              default="Género"
              value={user.gender}
              onSelectChange={this.handleChange}
            />
          </div>

          <div className="row">
          <div className="form-group col-xs-3">
            <span>Cumpleaños</span>
          </div>

          <div className="form-group col-xs-3">
            <FormSelect
              ref="day"
              options={days}
              default="Día"
              value={day}
              onSelectChange={this.handleChange}
            />
          </div>

            <div className="form-group col-xs-3">
              <FormSelect
                ref="month"
                options={months}
                default="Mes"
                value={month}
                onSelectChange={this.handleChange}
              />
            </div>

            <div className="form-group col-xs-3">
              <FormSelect
                ref="year"
                options={years}
                default="Año"
                value={year}
                 onSelectChange={this.handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <FormSelect
              ref="area"
              options={areas}
              default="Seleccionar área"
              value={user.area}
              onSelectChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <textarea
              ref="bio"
              className="form-control"
              placeholder="¿Qué te hace sentir #OrgullosamenteBVC?"
              value={user.bio}
              onChange={this.handleChange}>
            </textarea>
          </div>

          <button className="btn btn-primary"><i className="icon ion-ios-arrow-forward"></i></button>
        </form>
      </section>
    );
  }
});
