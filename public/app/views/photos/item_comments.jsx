'use strict';
var React = require('react');

module.exports = React.createClass({

  render: function() {
    var comments = this.props.comments;

    return (
     <div className="comments">
       <ul>
        {comments.map(function(comment) {
          return (
            <li key={comment.id}>
              <a href={"#profile/" + comment.commenter.username} className="profile_link" >
              { comment.commenter.username }</a> {comment.text}
            </li>
          )
        })}
       </ul>
     </div>
    );
  }
});