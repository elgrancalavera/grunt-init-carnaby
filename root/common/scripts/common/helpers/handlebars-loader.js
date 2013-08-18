/*
 * handlebars-loader.js
 * Copyright (c) 2013 M&C Saatchi
 * mcsaatchi.com
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
