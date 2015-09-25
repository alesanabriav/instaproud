'use strict';
var React = require('react');
var _ = require('underscore');
var Timeago = require('components/timeago.jsx');
module.exports = React.createClass({

  componentWillUpdate: function() {
    var node = this.getDOMNode();
    this.scrollHeight = node.scrollHeight;
    this.scrollTop = node.scrollTop;
  },

  componentDidUpdate: function() {
    var node = this.getDOMNode();
    node.scrollTop = this.scrollTop + (node.scrollHeight - this.scrollHeight);
  },

  render: function() {
    var comments = this.props.comments;
    var text;
    var seeMore = '';
    var user = JSON.parse(localStorage.getItem('user'));

    if (comments.length > 4) {
      seeMore = (<li><a className="see-more" href={"#photo/" + this.props.id}>Ver más comentarios</a></li>);
    }

    var commentNodes = comments.map(function(comment) {
      text = comment.text.replace(/#(\S+)/g, '<a href="#hashtag/$1">#$1</a>').replace(/@(\S+)/g, '<a href="#tagged/$1">@$1</a>');

      if(comment.commenter.id === user.id) {
        return (
          <li key={comment.id}>
            <span style={{textAlign: 'right', display: 'block'}} dangerouslySetInnerHTML={{__html: text}} />
            <span style={{textAlign: 'right', display: 'block'}}><Timeago date={comment.created} /></span>
          </li>
        )
      } else {
        return (
          <li key={comment.id}>
            <a href={"#profile/" + comment.commenter.username} className="profile_link" >
              { comment.commenter.username }
            </a> <br/><span dangerouslySetInnerHTML={{__html: text}} /><Timeago date={comment.created} />
          </li>
        )
      }
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