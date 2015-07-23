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
      dataURL: this.refs.cropper.getCroppedCanvas().toDataURL()
    });
  },

  rotate: function(e) {
    e.preventDefault();
    this.refs.cropper.rotate(90);
  },

  handleNext: function(e) {
    e.preventDefault();
    // var img = this.state.dataURL.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)[2];
    // var src;
    localStorage.setItem('src', this.state.dataURL);
    pubsub.trigger('navigator:change', 'filter');

    // $http.post('/api/photos/upload', {img: img}, function(res) {
    //   src = res.original;
    //   pubsub.trigger('navigator:change', 'filter/');
    // });
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
        style={{height: 500, width: '100%'}}
        minCropBoxWidth={500}
        minCropBoxHeight={500}
        aspectRatio={1}
        guides={false}
        strict={true}
        cropBoxmovable={false}
        dragCrop={false}
        cropBoxResizable={false}
        background={false}
        crop={this._crop} />
        <ul className="crop-options">
          <li><a href="#" ><i className="icon ion-ios-close-empty"></i></a></li>
          <li><a herf="#" onClick={this.rotate}><i className="icon ion-ios-refresh-empty"></i></a></li>
          <li><a href="#" onClick={this.handleNext}><i className="icon ion-ios-arrow-forward"></i></a></li>
        </ul>
      </div>
    );

  }
});