'use strict';
var _ = require('underscore');

module.exports = {
  'beforeEach': function(client) {
    client
      .url('localhost:3000')
      .waitForElementVisible('body', 3000)
      .setValue('input[type=text]', 'alejandrosanab')
      .setValue('input[type=password]', 'durden99')
      .click('.form-login-btn')
      .pause(1000);
  },

  'post a photo': function(client) {
    var filterOption = _.sample([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    var caption = _.sample([
      '#hashtagTestCaption',
      '@alejandrosanab',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque dignissimos distinctio error, quam voluptatum fuga exercitationem beatae quasi ut magni ipsam consectetur adipisci, veniam inventore explicabo, provident commodi ullam, aliquam.'
    ]);

    client
      .url('localhost:3000/#')
      .pause(1000)
      .setValue('input[type=file]', __dirname + '/fixtures/real.jpg')
      .pause(1000)
      .click('.crop-options>li:nth-child(4) a')
      .pause(1000)
      .click('.slidee>li:nth-child(' + filterOption + ')')
      .click('.filter-options>li:nth-child(3) a')
      .pause(1000)
      .setValue('textarea', caption)
      .click('.caption-options>li:nth-child(3) a')
      .pause(4000)
      .assert.elementPresent('.photo-feed:nth-child(1)')
      .end();
  },

  'comment a photo': function(client) {
    var comment = _.sample([
      '#hashtagTestComment',
      '@alejandrosanab',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque dignissimos distinctio error, quam voluptatum fuga exercitationem beatae quasi ut magni ipsam consectetur adipisci, veniam inventore explicabo, provident commodi ullam, aliquam.'
    ]);

    client
      .url('localhost:3000/#')
      .pause(1000)
      .setValue('.photo-feed:nth-child(1) input[type=text]', comment)
      .click('.photo-feed:nth-child(1) .comment-create-container button')
      .pause(1000)
      .assert.elementPresent('.photo-feed:nth-child(1) .comments>ul>li')
      .end();
  },

  'like a photo': function(client) {
    client
      .url('localhost:3000/#')
      .pause(1000)
      .click('.photo-feed:nth-child(1) .like')
      .pause(2000)
      .end();
  }
};
