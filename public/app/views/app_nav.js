'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var templateNav = require('templates/app_nav.hbs');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  events: {
    'change input': 'getPhoto',
    'click a': 'changeState'
  },

  /** Start listen events */
  initialize: function() {
    this.listenTo(pubsub, 'view:remove', this.remove, this);
    this.listenTo(pubsub, 'footerNav:changeState', this.changeState, this);
    this.listenTo(pubsub, 'footerNav:remove', this.remove, this);
    this.listenTo(pubsub, 'input:onFocus', this.hide, this);
    this.listenTo(pubsub, 'input:onFocusOut', this.show, this);
  },

  /**
   * attach template with data
   * @return {object} this
   */
  render: function() {
    this.$el
    .empty()
    .append(templateNav());

    return this;
  },

  /** hide this */
  hide: function() {
    this.$el.hide();
  },

  /** show this */
  show: function() {
    this.$el.show();
  },

  /**
   * get file from input and trigger event
   * @param  {object} e jquery event
   */
  getPhoto: function(e) {
    var $file = $(e.currentTarget)[0].files[0];
    return pubsub.trigger('photo:render', $file);
  },

  /** Show section active */
  changeState: function() {
    var $btns = $(this.el).find('a');
    var url = window.location.hash;

    if (!url) {
      $(this.el).find('.home').addClass('active');
    }

    $btns.each(function() {
      if (url === $(this).attr('href')) {
        $(this).parent().addClass('active');
      }
    });

  }
});
