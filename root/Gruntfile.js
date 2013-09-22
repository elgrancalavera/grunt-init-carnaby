/*global module:false*/
/*
 * {%= name %}
 * {%= repository %}
 * Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %}
 * {%= author_url %}
 */
'use strict';

var path = require('path');
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(path.resolve(dir));
};

module.exports = function(grunt) {
  grunt.initConfig({
    carnaby: {
      appDir: 'app',
      bowerDir: grunt.file.readJSON('.bowerrc').directory,
      targetDir: '.',
      vendorDir: 'vendor'
    },
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.carnaby/tmp'),
              mountFolder(connect, grunt.config('carnaby.vendorDir')),
              mountFolder(connect, path.join(grunt.config('carnaby.appDir') , 'core')),
              mountFolder(connect, grunt.config('carnaby.appDir'))
            ];
          }
        }
      }
    },
    watch: {
      options: {
        nospawn: true,
        livereload: true
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= carnaby.appDir %>/**/*.html',
          '.carnaby/tmp/*/scripts/templates.js'
        ]
      },
      updateConfig: {
        files: '.carnaby/project.json',
        tasks: ['carnaby:update-config']
      },
      project: {
        files: '<%= jshint.project %>',
        tasks: ['jshint:project']
      },
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },
      project: [
        'Gruntfile.js',
        '<%= carnaby.appDir %>/core/common/scripts/**/*.js',
        'tasks/**/*.js',
        '!**/templates/**/*',
      ]
    }
  });

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // manually load grunt-carnaby (by now)
  grunt.loadNpmTasks('grunt-carnaby');

  grunt.registerTask('carnaby:start', [
    'carnaby:update-client:all',
    'jshint',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('default', ['carnaby:build:all']);

};
