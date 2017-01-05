/*
 * grunt-file-convert
 * https://github.com/ermanno-pirotta/grunt-file-convert
 *
 * Copyright (c) 2017 Ermanno Pirotta
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('file_convert', 'Parses a set of input files, applies some custom trasformation to each read line, and writes the result of the trasformation to a set of output files.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      skipRegex: undefined,
      transformer: function(line, index){
            return line;
      },
      filePrefix: '',
      filePostfix: ''
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = options.filePrefix ? (options.filePrefix + grunt.util.linefeed) : '';
      src += f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source
        grunt.log.writeln('processing file ' + filepath );

        var fileTransformed = '';
        var fileStr = grunt.util.normalizelf(grunt.file.read(filepath));
        grunt.log.debug('file before transformation:');
        grunt.log.debug(fileStr);

        var lines = fileStr.split(grunt.util.linefeed);
        var linesToBeProcessed = lines.filter(function(line){
          grunt.log.debug('filtering line = ' + line);
          if(options.skipRegex === undefined){
              return true;
          }

          var skipReg = new RegExp(options.skipRegex);

          return !skipReg.test(line);
        });

        var nrOfLines = linesToBeProcessed.length;
        linesToBeProcessed.map(function(line, index){
            grunt.log.debug('source file line= ' + line);

            fileTransformed += options.transformer(line, index);
            if (nrOfLines !== index + 1) {
                fileTransformed += grunt.util.linefeed;
            }
        });

        return fileTransformed;
      });

      src += options.filePostfix ? (grunt.util.linefeed + options.filePostfix) : '';

      grunt.log.debug('file after transformation');
      grunt.log.debug(src);
      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
