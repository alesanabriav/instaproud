'use strict';
var React = require('react');
var Photo = require('views/profile/grid_image.jsx');
var $http = require('utils/http');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      photos: [],
      hashtag: this.props.hashtag
    }
  },

  componentDidMount: function() {
    var hash = this.state.hashtag;
    $http.get('/api/hashtags/'+ hash +'/photos', null, function(res){
      this.setState({photos: res.photos});
    }.bind(this));
  },

  render: function() {
    var photoNodes = this.state.photos.map(function(photo) {
      return <Photo key={photo.id} photo={photo} />
    });

    return (
      <div className="photos-grid">
        <div className="row">
          {photoNodes}
        </div>
      </div>
    );
  }
});