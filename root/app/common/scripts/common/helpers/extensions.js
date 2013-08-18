/*
 * common/scripts/common/helpers/extensions.js
 * {%= repository %}
 * Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %}
 * {%= author_url %}
 */
define(function (require, exports, module) {
  'use strict';
  var Backbone = require('backbone');
  require('backbone.marionette');
  var _ = require('underscore');
  var app = require('core/app');

  /*
   * Attempts to resolve a template using the application's templates, falling
   * back to the default Marionette template on failure.
   */
  Backbone.Marionette.View.prototype.getTemplate = function () {
    var template = Backbone.Marionette.getOption(this, 'template');
    var t = _.isString(template) &&
      app.config &&
      app.config.templates &&
      app.config.templates[template];
    return t || template;
  };

  return exports;
});
