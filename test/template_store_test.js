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

exports.template_store = {
    setUp: function (done) {
        // setup here if necessary
        done();
    },
    default_options: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/templateStore_default.js');
        console.log("\nactual:\n" + actual);
        var expected = grunt.file.read('test/expected/templateStore_default.js');
        console.log("\nexpected:\n" + expected);
        test.equal(actual, expected, 'Default behavior should concatenate files into a requirejs wrapped template store');

        test.done();
    },
    htmlmin_options: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/templateStore_htmlmin.js');
        console.log("\nactual:\n" + actual);
        var expected = grunt.file.read('test/expected/templateStore_htmlmin.js');
        console.log("\nexpected:\n" + expected);
        test.equal(actual, expected, 'Html min behavior should concatenate and minify files into a requirejs wrapped template store');

        test.done();
    }
};
