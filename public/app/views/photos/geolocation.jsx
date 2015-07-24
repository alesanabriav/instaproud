'use strict';
var React = require('react');
var $ = require('jquery');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      status: 'Agregar localización'
    }
  },

  handleLocation: function(e) {
    e.preventDefault();
    var locationData = {};

    if (navigator.geolocation) {
      this.setState({status: 'Agregando'});
      navigator.geolocation.getCurrentPosition(function(position) {
        locationData.longitude = position.coords.longitude;
        locationData.latitude = position.coords.latitude;

        $.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + locationData.latitude + ',' + locationData.longitude + '&key=AIzaSyDvIcrhqw1Zt09CL-Z-SBKomCkdQT9q8n8')
        .then(function(res) {
        locationData.address = res.results[0].formatted_address;
        locationData.name = res.results[0].address_components[2].short_name;
        this.setState({status: locationData.name});

        this.props.onLocation(locationData);

        }.bind(this));

      }.bind(this));

    } else {
      this.setState({status: 'localización no soportada'});
    }
  },

  render: function() {
    return (
      <a href="#" onClick={this.handleLocation} className="btn btn-primary btn-sm">
         <span className="icon ion-ios-location"></span> {this.state.status} </a>
    );
  }
});