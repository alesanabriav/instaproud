'use strict';
var React = require('react');
var _ = require('underscore');

module.exports = React.createClass({

  render: function() {
    var comments = _.sortBy(this.props.comments, 'created');
    var text;
    var seeMore = '';

    if (comments.length > 4) {
      seeMore = (<li><a className="see-more" href={"#photo/" + this.props.id}>Ver más comentarios</a></li>);
    }

    var commentNodes = comments.map(function(comment) {
      text = comment.text.replace(/#(\S+)/g, '<a href="#hashtag/$1">#$1</a>').replace(/@(\S+)/g, '<a href="#tagged/$1">@$1</a>');

      return (
        <li key={comment.id}>
          <a href={"#profile/" + comment.commenter.username} className="profile_link" >
          { comment.commenter.username }</a> <span dangerouslySetInnerHTML={{__html: text}} />
        </li>
      )
    });

    return (
     <div className="comments">
       <ul>
       {seeMore}
        {commentNodes}
       </ul>
     </div>
    );
  }
});