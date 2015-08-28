'use strict';
var React = require('react');
var Cropper = require('react-cropper');
var pubsub = require('utils/pubsub');
var $http = require('utils/http');
var $ = require('jquery');
var isMobile = require('is-mobile');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      src: 'http://fengyuanchen.github.io/cropper/img/picture.jpg',
      dataURL: '',
      height: 0
    }
  },

  crop: function() {
    this.setState({
      canvas: this.refs.cropper.getCroppedCanvas({width: 500, height: 500}),
      canvasThumb: this.refs.cropper.getCroppedCanvas({width: 50, height: 50})
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
    var dataUrl = this.state.canvas.toDataURL("image/jpeg", 1.0);
    var dataUrlThumb = this.state.canvasThumb.toDataURL("image/jpeg", 1.0);
    localStorage.setItem('src', dataUrl);
    localStorage.setItem('srcThumb', dataUrlThumb);
    pubsub.trigger('navigator:change', 'filter');
  },

  componentWillMount: function() {
    var src = localStorage.getItem('src');
    var height = 500;

    if (isMobile()) {
      height = $( document ).height() - 100;
    }

    this.setState({
      src: src,
      height: height
    });

  },

  render: function() {
    return (
      <div className="crop-container">

      <Cropper
        className='cropper'
        ref='cropper'
        src={this.state.src}
        style={{height: this.state.height, width: '100%'}}
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
        crop={this.crop} />

        <ul className="crop-options">
          <li><a href="#" ><i className="icon ion-android-close"></i></a></li>
          <li><a herf="#" onClick={this.rotateUndo}><i className="icon ion-ios-undo-outline"></i></a></li>
          <li><a herf="#" onClick={this.rotateRedo}><i className="icon ion-ios-redo-outline"></i></a></li>
          <li><a href="#" onClick={this.handleNext}><i className="icon ion-ios-arrow-forward"></i></a></li>
        </ul>
      </div>
    );

  }
});