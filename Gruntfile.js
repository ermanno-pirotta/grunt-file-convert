/*
 * grunt-file-convert
 * https://github.com/ermanno-pirotta/grunt-file-convert
 *
 * Copyright (c) 2017 Ermanno Pirotta
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporterOutput: ""
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    file_convert: {
      copy_lines: {
        files: {
          'tmp/copy_lines': ['test/fixtures/input_file_to_be_copied']
        },
      },

      remove_lines: {
        files: {
          'tmp/remove_lines': ['test/fixtures/input_file_with_lines_to_be_removed']
        },

        options: {
            skipRegex: '^\\/\\*.*\\*\/$'
        }
      },

      trasform_lines: {
        files: {
          'tmp/trasform_lines': ['test/fixtures/input_file_to_be_transformed']
        },

        options: {
          transformer: function(line){
              var regex = new RegExp("TO BE TRANSFORMED");
              return line.replace(regex,'TRANSFORMED!!!');
          }
        }
      },

      prefix_postfix: {
        files: {
          'tmp/prefix_postfix': ['test/fixtures/input_file_which_need_prefix']
        },

        options: {
          filePrefix: '/*',
          filePostfix: '*/'
        }
      },

      process_all_lines: {
        files: {
          'tmp/process_all_lines': ['test/fixtures/input_file_with_multiple_lines']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'file_convert', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
