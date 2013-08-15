/*
 * app: a single reference to the aplication object.
 *
 * {%= name %}
 * {%= repository %}
 * Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %}
 * {%= author_url %}
 */
define(function (require, exports, module) {
    'use strict';
    var Backbone = require('backbone');
    require('backbone.marionette');
    exports = new Backbone.Marionette.Application();
});
