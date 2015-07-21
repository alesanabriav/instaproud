'use strict';
var React = require('react');

module.exports = React.createClass({

  render: function() {
    return (
      <div className="input-group comment-create-container">
        <input type="text" className="form-control commentText" placeholder="Comentar..." />
        <span className="input-group-btn">
          <button className="comment btn"><i className="icon ion-ios-paperplane-outline"></i></button>
        </span>
      </div>
    );
  }
});
