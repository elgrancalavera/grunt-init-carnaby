'use strict';

module.exports = function(grunt) {



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
      'bower': 'root.bower.json'
    },
    carnaby: {}
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  // manually load grunt-carnaby
  grunt.loadNpmTasks('grunt-carnaby');

  grunt.registerTask('default', ['jshint', 'nodeunit', 'clean']);
  grunt.registerTask('code', ['jshint', 'nodeunit', 'watch']);

};
