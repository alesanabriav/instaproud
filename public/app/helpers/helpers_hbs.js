var Handlebars = require("hbsfy/runtime");
var _ = require('underscore');
var urls = require('config/urls');

/**
 * if a user liked the photo show something
 * @param  {array} users  list of users
 * @param  {object} options
 * @return {object}
 */
Handlebars.registerHelper("checkLiked", function(users, options) {

  var user = JSON.parse(localStorage.getItem('user'));

  var username = {username: user.username};

  if (_.where(users, username).length > 0) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

Handlebars.registerHelper("checkLiked", function(users, options) {

  var user = JSON.parse(localStorage.getItem('user'));

  var username = {username: user.username};

  if (_.where(users, username).length > 0) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

Handlebars.registerHelper("itsHigher", function(arr, num, options) {

  if (arr && arr.length > num) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }

});

Handlebars.registerHelper("absoluteUrl", function(url, options) {
  if (url !== "") {
    return urls.baseUrl + "/" + url;
  }
});

Handlebars.registerHelper("s3Url", function(folder, name, options) {
  if (folder !== "" && name !== "") {
    return urls.s3Bucket + "/" + folder + "/" + name;
  }
});

Handlebars.registerHelper("isNotEmpty", function(arr, options) {

  if (arr && arr.length > 0) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }

});

Handlebars.registerHelper('everyNth', function(context, every, options) {
  var fn = options.fn;
  var inverse = options.inverse;
  var ret = "";

  if(context && context.length > 0) {

    for(var i=0, j=context.length; i<j; i++) {
      var modZero = i % every === 0;
      ret = ret + fn(_.extend({}, context[i], {
        isModZero: modZero,
        isModZeroNotFirst: modZero && i > 0,
        isLast: i === context.length - 1
      }));
    }
  } else {
    ret = inverse(this);
  }
  return ret;
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
    newText = text.replace(/#(\S+)/g, '<a href="#hashtag/$1">#$1</a>');
    newText = newText.replace(/@(\S+)/g, '<a href="#profile/$1">@$1</a>');
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

