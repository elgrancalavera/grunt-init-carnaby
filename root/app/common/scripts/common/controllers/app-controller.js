/*
 * app-controller: the main entry point for the applcation, all configuration
 *  should be set against the `common/app-controller` object in the main.js
 *  configuration file.
 *
 * {%= name %}
 * {%= repository %}
 * Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %}
 * {%= author_url %}
 */
define(function (require, exports, module) {
    'use strict';

    /*
     * `common/controllers/app-controller` must be the first one requiring
     * `common/app`.
     */
    var app = require('common/app');

    /*
     * Initialisation than can be safely shared across different and possible
     * unknown clients. Any client specific initialisation routine must be moved
     * to the client-specific application bootstrapping file.
     * For instance, here we set the templates for all clients, which come from
     * the client, as well as extending any general configuration parameter with
     * the client-specific configuration parameters.
     */
    app.addInitializer(function (options) {
        app.templates = options.templates;
        app.config = _.extend(module.config(), options.config);
    });

    /*
     * Any routine that must be run for all possible clients after startup. See
     * previous comment.
     */
    app.on('start', function(options) {

    });

    exports.app = app;

});
