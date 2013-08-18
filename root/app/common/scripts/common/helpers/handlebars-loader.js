/*
 * common/scripts/common/helpers/handlebars-loader.js
 * {%= repository %}
 * Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %}
 * {%= author_url %}
 */
define(function (require, exports, module) {
  'use strict';
  var Handlebars = window.Handlebars;
  if (!Handlebars) {
    throw new Error('window.Handlebars is undefined!');
  }
  exports = Handlebars;
  return exports;
});
