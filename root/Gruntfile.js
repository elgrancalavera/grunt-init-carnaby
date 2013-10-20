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
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var mountFolder = function (connect, dir) {
  return connect.static(path.resolve(dir));
};

module.exports = function(grunt) {
  grunt.initConfig({
    carnaby: {
      appDir: 'app',
      bowerDir: grunt.file.readJSON('.bowerrc').directory,
      targetDir: 'targets',
      vendorDir: 'vendor',
      tmpDir: '.tmp',
      symlinks: {
        common: '.symlinks/common',
        vendor: '.symlinks/vendor',
      },
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
              mountFolder(connect, grunt.config('carnaby.symlinks.common')),
              mountFolder(connect, grunt.config('carnaby.symlinks.vendor')),
              mountFolder(connect, grunt.config('carnaby.tmpDir')),
              mountFolder(connect, grunt.config('carnaby.appDir')),
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
          '<%= carnaby.tmpDir %>/*/scripts/templates.js'
        ]
      },
      updateConfig: {
        files: '.carnaby/project.json',
        tasks: ['carnaby:update-config']
      },
      project: {
        files: [
          '<%= jshint.project.src %>',
          '!**/templates/**/*.js',
        ],
        tasks: ['jshint:project']
      },
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },
      project: {
        options: {
          ignores: [
            '**/templates/**/*.js'
          ]
        },
        src: [
          'Gruntfile.js',
          '<%= carnaby.appDir %>/**/scripts/**/*.js',
          'tasks/**/*.js'
        ]
      },
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['jshint']);

  grunt.registerTask('start', [
    'carnaby:update-client:all',
    'jshint',
    'connect:livereload',
    'watch'
  ]);
};
