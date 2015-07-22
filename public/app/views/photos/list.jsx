'use strict';
var React = require('react');
var listenTo = require('react-listenTo');
var models = require('models/photo');
var Item = require('views/photos/item.jsx');
var loadImages = require('utils/loadImages');
var pubsub = require('utils/pubsub');

module.exports = React.createClass({
  mixins: [listenTo],

  getInitialState: function() {
    return {
      photos: []
    }
  },

  componentDidMount: function() {
    var collection = new models.photos();
    collection.fetch({reset: true, success: function(res) {
      this.setState({photos: res});
    }.bind(this)});
    this.listenTo(pubsub, 'general:scroll', this.loadMore);
  },

  handleScroll: function() {
    console.log('scroll list');
  },

  render: function() {
    var photoNodes = this.state.photos.map(function(photo) {
      return (<Item key={photo.id} photo={photo} />);
    });
    return (
      <div>
        {photoNodes}
      </div>
    );
  }
});