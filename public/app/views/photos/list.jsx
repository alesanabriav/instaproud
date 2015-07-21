'use strict';
var React = require('react');
var listenTo = require('react-listenTo');
var models = require('models/photo');
var Item = require('views/photos/item.jsx');

module.exports = React.createClass({
  mixins: [listenTo],

  setInitialState: function() {
    return {
      photos: []
    }
  },

  componentDidMount: function() {
    var collection = new models.photos();
    collection.fetch({reset: true, success: function(res){
      this.setStatus({photos: res});
    }.bind(this)});
  },

  render: function() {
    var photoNodes = this.state.photos.map(function(photo, i) {
        return (<Item key={i} photo={photo} />);
      });
    return (
      {photoNodes}
    );
  }
});