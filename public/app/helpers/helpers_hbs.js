var Handlebars = require("hbsfy/runtime");
var _ = require('underscore');

Handlebars.registerHelper("checkLiked", function(users) {

  var user = localStorage.getItem('user');

  var username = {username: JSON.parse(user).username};

  if (_.where(users, username).length > 0) {
    return '<span class="unlike"><i class="fa fa-heart"></i> Like</span>';
  } else {
    return '<span class="like"><i class="fa fa-heart-o"></i> Like</span>';
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

