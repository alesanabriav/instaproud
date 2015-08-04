'use strict';
var React = require('react');
var GMaps = require('gmaps');
var urls = require('config/urls');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      locations: []
    }
  },

  componentDidMount: function(){

    // Only componentDidMount is called when the component is first added to
    // the page. This is why we are calling the following method manually.
    // This makes sure that our map initialization code is run the first time.

    this.componentDidUpdate();
  },

  componentDidUpdate: function() {
    var map = new GMaps({
      el: '#map',
      lat: 4.6482975,
      lng: -74.107807
    });

    this.props.locations.forEach(function(location) {
      if (location.geolocation) {
         map.addMarker({
          lat: location.geolocation.latitude,
          lng: location.geolocation.longitude,
          click: function(e) {
            window.location = "/#photo/" + location.id;
          }
        });
      }
    });

    map.fitZoom();
  },

  render: function(){
    return (
      <div className="map-holder">
        <p>Loading...</p>
        <div id="map"></div>
      </div>
    );
  }
});
