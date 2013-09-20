/*
 * {%= name %}
 * {%= repository %}
 * Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %}
 * {%= author_url %}
 */
/*global module:false*/
'use strict';
var path = require('path');
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(path.resolve(dir));
};

module.exports = function(grunt) {
  grunt.initConfig({

    //--------------------------------------------------------------------------
    //
    // Carnaby
    //
    //--------------------------------------------------------------------------

    carnaby: {
      appDir: 'app',
      bowerDir: grunt.file.readJSON('.bowerrc').directory,
      targetDir: '.'
    },

    //--------------------------------------------------------------------------
    //
    // Grunt
    //
    //--------------------------------------------------------------------------

    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, 'dist')
            ];
          }
        }
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
          '<%= carnaby.appDir %>/**/*.html'
        ]
      },
      dev: {
        files: '<%= jshint.dev %>',
        tasks: ['jshint:dev']
      },
      updateConfig: {
        files: '.carnaby/project.json',
        tasks: ['carnaby:update-config']
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },
      dev: [
        'Gruntfile.js',
        '<%= carnaby.appDir %>/scripts/**/*.js'
      ]
    }
  });

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // manually load grunt-carnaby (by now)
  grunt.loadNpmTasks('grunt-carnaby');

  grunt.registerTask('carnaby:start', [
    'carnaby:update-client:all',
    'jshint:dev',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('default', ['carnaby:build:all']);

};
