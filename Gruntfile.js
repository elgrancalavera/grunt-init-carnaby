'use strict';

module.exports = function(grunt) {

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
  // Cherry pick html5bp
  //
  //----------------------------------

  var html5bp = {
    root: ['404.html', 'apple*', 'favicon.ico', 'humans.txt', 'robots.txt'],
    js: ['plugins.js'],
    css: ['normalize.css']
  };

  var coreHTML5bp = [].concat(
    addPrefix(html5bp.root, 'root/app/common/'),
    addPrefix(html5bp.js, 'root/app/common/scripts/'),
    addPrefix(html5bp.css, 'root/app/common/styles/')
  );

  //----------------------------------
  //
  // Tasks
  //
  //----------------------------------

  grunt.option('appDir', 'root');

  grunt.initConfig({
    nodeunit: {
      files: ['test/**/*_test.js'],
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      template: {
        src: 'template.js'
      },
      test: {
        src: ['test/**/*.js']
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      template: {
        files: '<%= jshint.template.src %>',
        tasks: ['jshint:template']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'nodeunit']
      },
    },
    copy: {
      html5bp: {
        files: [
          {
            cwd: 'bower_components/html5-boilerplate',
            expand: true,
            src: html5bp.root,
            dest: 'root/app/common'
          },
          {
            cwd: 'bower_components/html5-boilerplate/js',
            expand: true,
            src: html5bp.js,
            dest: 'root/app/common/scripts'
          },
          {
            cwd: 'bower_components/html5-boilerplate/css',
            expand: true,
            src: html5bp.css,
            dest: 'root/app/common/styles'
          }
        ]
      }
    },
    extend: {
      bower: {
        options: {
          deep: true
        },
        files:[{
          'root/bower.json': ['bower.json', '.bower.json']
        }]
      }
    },
    clean: {
      html5bp: coreHTML5bp
    },
    carnaby: {}
  });

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  // carnaby is still not one of the dependencies
  grunt.loadNpmTasks('grunt-carnaby');

  grunt.registerTask('default', ['jshint', 'nodeunit', 'clean', 'copy']);
  grunt.registerTask('code', ['jshint', 'nodeunit', 'watch']);

};
