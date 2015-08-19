'use strict';
var React = require('react');

module.exports = React.createClass({

  render: function() {
    var hashtag = this.props.hashtag;
    if (hashtag) {
      var hashtagFiltered = hashtag.name.replace('#', '');
    }

    return (
      <li className="list-group-item">
        <a href={'#hashtag/' + hashtagFiltered} >{hashtag.name}</a>
      </li>
    )
  }
});