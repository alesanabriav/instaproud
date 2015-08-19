'use strict';
var React = require('react');
global.jQuery = require("jquery");
var $ = jQuery;
var Filters = require('views/photos/filter_filters.jsx');
var Vintage = require('vintagejs/dist/vintage');
var photoFilters = require('utils/filters');
var pubsub = require('utils/pubsub');
var _ = require('underscore');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      src: '',
      effect: {}
    }
  },

  componentWillMount: function() {
    var src = localStorage.getItem('src');
    this.setState({
      src: src
    })
  },

  handleFilter: function(filter) {
    var effect = _.extend(this.state.effect, {
      curves: photoFilters[filter],
      vignette: 0.2,
      desaturate: 0
    });

    if (filter === 'inkwell') {
      effect = _.extend(this.state.effect,{
        desaturate: 1
      });
    }

    this.setState({effect: effect});
    this.applyFilter();
  },

  applyFilter: function() {
    var img = document.getElementById('img-main');
    img.src = this.state.src;
    var options = {
      onError: function() {
        console.log('Error filters image');
      }
    };
    new Vintage(img, options, this.state.effect);
  },

  handleNext: function(e) {
    e.preventDefault();
    var img = document.getElementById('img-main');
    localStorage.setItem('filtered', img.src);
    pubsub.trigger('navigator:change', 'caption');
  },

  handleChange: function() {
    var brightness = React.findDOMNode(this.refs.brightness).value;
    var effect = _.extend(this.state.effect, {contrast: parseInt(brightness)});
    console.log(effect);
    this.setState({effect: effect});
    this.applyFilter();
  },

  render: function() {
    return (
      <div>
        <div className="img-active">
          <img id="img-main" src={this.state.src} className="img-responsive" />
        </div>

        <ul className="filter-options">
          <li>
            <a href="#crop"><i className="icon ion-ios-arrow-back"></i></a>
          </li>
          <li className="title">Filtros</li>
          <li>
            <a href="#" onClick={this.handleNext}><i className="icon ion-ios-arrow-forward"></i></a>
          </li>
        </ul>
        <input
          ref="brightness"
          type="range"
          className="form-control"
          min="-50"
          value={this.state.brightness}
          max="50"
          step="10"
          onChange={this.handleChange}
          style={{'maxWidth': '500px', 'margin': '0 auto'}}
           />

        <Filters onAddFilter={this.handleFilter} />
    </div>
    );
  }
});