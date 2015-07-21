'use strict';
var React = require('react');

module.exports = React.createClass({

  render: function() {
    var comments = this.props.comments;

    if (comments.length > 4) {
      var seeMore = (<li><a className="see-more" href="#photo/{{ id }}">Ver más comentarios</a></li>);
    }
    return (
     <div className="comments">
       <ul>
          {seeMore}

          <li>
            <a href="#profile/{{ commenter.username }}" className="profile_link" >
              { commenter.username }
            </a>

          </li>

       </ul>
     </div>
    );
  }
});