var Handlebars = require("hbsfy/runtime");
var _ = require('underscore');
/**
 * if a user liked the photo show something
 * @param  {array} users  list of users
 * @param  {object} options
 * @return {object}
 */
Handlebars.registerHelper("checkLiked", function(users, options) {

  var user = localStorage.getItem('user');

  var username = {username: JSON.parse(user).username};

  if (_.where(users, username).length > 0) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }

});

Handlebars.registerHelper("likesToCount", function(likes, options) {

  if (likes.length > 1) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }

});

Handlebars.registerHelper("removeCharacter", function(text, character) {
  if (text && character) {
    return text.replace(character, '');
  } else {
    return text;
  }
});

Handlebars.registerHelper("convertHashtag", function(text) {
  var newText;

  if (text) {
    newText = text.replace(/#(\S+)/g,'<a href="#hashtag/$1">#$1</a>');
    newText = newText.replace(/@(\S+)/g,'<a href="#profile/$1">@$1</a>');
    return newText;
  } else {
    return text;
  }

});

Handlebars.registerHelper("countArr", function(arr) {
  if (arr instanceof Array) {
    return arr.length;
  };

  return arr;
});

Handlebars.registerHelper("userAuthenticated", function(userId, options) {
  var user = JSON.parse(localStorage.getItem('user'));

  if (userId === user.id) {
    return options.fn(this);

  } else {
    return options.inverse(this);
  }
});

