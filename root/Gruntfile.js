/*
 * {%= name %}
 * {%= repository %}
 * Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %}
 * {%= author_url %}
 */
'use strict';

//--------------------------------------------------------------------------
//
// Helpers
//
//--------------------------------------------------------------------------

//----------------------------------
//
// Connect
//
//----------------------------------

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {

  //--------------------------------------------------------------------------
  //
  // ad hoc config
  //
  //--------------------------------------------------------------------------

  grunt.option('appDir', 'app');

  //----------------------------------
  //
  // Utils
  //
  //----------------------------------

  var addPrefix = function (list, prefix) {
    return grunt.util._.map(list, function (item) {
      return prefix + item;
    });
  };

  // saving these two for later, so jshint stops whining

  // var addSuffix = function (list, suffix) {
  //   return grunt.util._.map(list, function (item) {
  //     return item + suffix;
  //   });
  // };

  // var wrap = function (list, prefix, suffix) {
  //   return addSuffix(addPrefix(list, prefix), suffix);
  // }

  //----------------------------------
  //
  // Cherry pick from html5bp
  //
  //----------------------------------

  var html5bp = {
    root: ['404.html', 'apple*', 'favicon.ico', 'humans.txt', 'robots.txt'],
    js: ['plugins.js'],
    css: ['normalize.css']
  };

  var commonHTML5bp = [].concat(
    addPrefix(html5bp.root, grunt.option('appDir') + '/common/'),
    addPrefix(html5bp.js, grunt.option('appDir') + '/common/scripts/'),
    addPrefix(html5bp.css, grunt.option('appDir') + '/common/styles/')
  );

  grunt.initConfig({

    //--------------------------------------------------------------------------
    //
    // js hint
    //
    //--------------------------------------------------------------------------

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      app: {
        src: [
          grunt.option('appDir') + '/common/scripts/common/**/*',
          grunt.option('appDir') + '/clients/*/scripts/**/*'
        ]
      }
    },

    //--------------------------------------------------------------------------
    //
    // watch
    //
    //--------------------------------------------------------------------------

    watch: {

    },

    //--------------------------------------------------------------------------
    //
    // copy
    //
    //--------------------------------------------------------------------------

    copy: {
      install: {
        files: [
          {
            cwd: '.carnaby/bower_components/html5-boilerplate',
            expand: true,
            src: html5bp.root,
            dest: grunt.option('appDir') + '/common'
          },
          {
            cwd: '.carnaby/bower_components/html5-boilerplate/js',
            expand: true,
            src: html5bp.js,
            dest: grunt.option('appDir') + '/common/scripts'
          },
          {
            cwd: '.carnaby/bower_components/html5-boilerplate/css',
            expand: true,
            src: html5bp.css,
            dest: grunt.option('appDir') + '/common/styles'
          }
        ]
      }
    },

    //--------------------------------------------------------------------------
    //
    // connect
    //
    //--------------------------------------------------------------------------

    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      dev: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, grunt.option('appDir') + '/clients')
            ];
          }
        }
      }
    },

    //--------------------------------------------------------------------------
    //
    // clean
    //
    //--------------------------------------------------------------------------

    clean: {
      install: [].concat(commonHTML5bp)
    }

  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('install', 'clean:install', 'copy:install');
  grunt.registerTask('server', ['default', 'connect', 'watch']);
  grunt.registerTask('default', ['jshint']);

};
