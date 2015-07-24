'use strict';
var React = require('react');
global.jQuery = require("jquery");
var $ = jQuery;
var Filters = require('views/photos/filter_filters.jsx');
var Vintage = require('vintagejs/dist/vintage');
var photoFilters = require('utils/filters');
var pubsub = require('utils/pubsub');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      src: '',
      original: '',
      filtered: {}
    }
  },

  componentWillMount: function() {
    var src = localStorage.getItem('src');
    this.setState({
      src: src
    })
  },

  handleFilter: function(filter) {
    var img = document.getElementById('img-main');
    img.src = this.state.src;

    var options = {
        onError: function() {
          console.log('ERROR');
        }
    };

    var effect = {
      curves: photoFilters[filter],
      vignette: 0.2
    };

    if (filter === 'inkwell') {
      effect = {
        desaturate: 1
      }
    }

    this.state.filtered = new Vintage(img, options, effect);
  },

  componentWillUpdate: function() {
    console.log('will update');
  },

  handleNext: function(e) {
    e.preventDefault();
    var img = document.getElementById('img-main');

    localStorage.setItem('filtered', img.src);
    pubsub.trigger('navigator:change', 'caption');
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
          <li>Filtros</li>
          <li>
            <a href="#" onClick={this.handleNext}><i className="icon ion-ios-arrow-forward"></i></a>
          </li>
        </ul>
        <Filters onAddFilter={this.handleFilter} />
    </div>
    );
  }
});