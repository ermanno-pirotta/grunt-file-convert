'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.file_convert = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },

  should_copy_the_file_with_default_trasform_function: function(test){
    test.expect(1);

    var actual = grunt.file.read('tmp/copy_lines');
    var expected = grunt.file.read('test/expected/output_file_to_be_copied');
    test.equal(actual, expected, 'should copy all file lines');

    test.done();
  },

  should_skip_lines_by_pattern: function(test){
    test.expect(1);

    var actual = grunt.file.read('tmp/remove_lines');
    var expected = grunt.file.read('test/expected/output_file_with_lines_to_be_removed');
    test.equal(actual, expected, 'should skip lines by pattern: ^\\/\\*.*\\*\/$');

    test.done();
  },

  should_trasform_lines_with_custom_transformer: function(test){
    test.expect(1);

    var actual = grunt.file.read('tmp/trasform_lines');
    var expected = grunt.file.read('test/expected/output_file_to_be_transformed');
    test.equal(actual, expected, 'should trasform lines with custom transformer');

    test.done();
  }
};
