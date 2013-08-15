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
    addPrefix(html5bp.root, 'root/app/core/'),
    addPrefix(html5bp.js, 'root/app/core/scripts/'),
    addPrefix(html5bp.css, 'root/app/core/styles/')
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
            dest: 'root/app/core'
          },
          {
            cwd: 'bower_components/html5-boilerplate/js',
            expand: true,
            src: html5bp.js,
            dest: 'root/app/core/scripts'
          },
          {
            cwd: 'bower_components/html5-boilerplate/css',
            expand: true,
            src: html5bp.css,
            dest: 'root/app/core/styles'
          }
        ]
      }
    },
    clean: {
      html5bp: coreHTML5bp
    },
    carnaby: {}
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-carnaby');

  grunt.registerTask('default', ['jshint', 'nodeunit', 'clean', 'copy']);
  grunt.registerTask('code', ['default', 'watch']);

};
