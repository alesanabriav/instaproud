'use strict';
var React = require('react');
var Item = require('views/photos/item.jsx');
var Waypoint = require('react-waypoint');
var photoStore = require('stores/photosStore');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      photos: []
    }
  },

  componentDidMount: function() {
    photoStore.getAll();
    photoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    photoStore.removeChangeListener(this._onChange);
  },

  _onChange: function(data) {
    this.setState({photos: data});
  },

  loadMore: function() {
    photoStore.getMore(this.state.photos);
  },

  render: function() {
    var photoNodes = this.state.photos.map(function(photo) {
      return <Item key={photo.id} photo={photo} />;
    }.bind(this));

    return (
    <div>
      {photoNodes}
      <Waypoint onEnter={this.loadMore} threshold={0.2} />
    </div>
    );
  }
});