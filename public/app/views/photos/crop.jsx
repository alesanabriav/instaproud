'use strict';
var React = require('react');
var Cropper = require('react-cropper');
var pubsub = require('utils/pubsub');
var $http = require('utils/http');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      src: 'http://fengyuanchen.github.io/cropper/img/picture.jpg',
      dataURL: ''
    }
  },

  _crop: function() {
    this.setState({
      dataURL: this.refs.cropper.getCroppedCanvas({width: 500, height: 500})
    });
  },

  rotateRedo: function(e) {
    e.preventDefault();
    this.refs.cropper.rotate(90);
  },

  rotateUndo: function(e) {
    e.preventDefault();
    this.refs.cropper.rotate(-90);
  },

  handleNext: function(e) {
    e.preventDefault();
    var data = this.state.dataURL.toDataURL();
    localStorage.setItem('src', data);
    pubsub.trigger('navigator:change', 'filter');
  },

  componentWillMount: function() {
    var src = localStorage.getItem('src');
    this.setState({
      src: src
    })
  },

  render: function() {
    return (
      <div>
      <Cropper
        ref='cropper'
        src={this.state.src}
        style={{height: 300, width: '100%'}}
        minCropBoxWidth={500}
        minCropBoxHeight={500}
        aspectRatio={1}
        guides={false}
        strict={true}
        cropBoxmovable={false}
        movable={false}
        dragCrop={false}
        cropBoxResizable={false}
        background={false}
        center={false}
        crop={this._crop} />

        <ul className="crop-options">
          <li><a href="#" ><i className="icon ion-ios-close-empty"></i></a></li>
          <li><a herf="#" onClick={this.rotateUndo}><i className="icon ion-ios-undo-outline"></i></a></li>
          <li><a herf="#" onClick={this.rotateRedo}><i className="icon ion-ios-redo-outline"></i></a></li>
          <li><a href="#" onClick={this.handleNext}><i className="icon ion-ios-arrow-forward"></i></a></li>
        </ul>

        <canvas id="crop" width="500" height="500" />
      </div>
    );

  }
});