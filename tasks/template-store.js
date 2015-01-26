/*
 * grunt-template-store
 * https://github.com/dryajov/grunt-template-store
 *
 * Copyright (c) 2014 dryajov
 * Licensed under the MIT license.
 */

'use strict';

var minify = require('html-minifier').minify;

module.exports = function (grunt) {

    var templateStoreHeader = 'define(function(){\nvar templateStore = {};\n',
        templateStoreFooter = '\nreturn templateStore;\n});';

    grunt.registerMultiTask('template-store', 'Generate template stores', function () {
        var options = this.options({
                htmlmin: {}
            }),
            that = this;

        /**
         * Run template source through htmlmin
         * @param  {String} source  Template source
         * @return {String}         Minified template
         */
        this.process = function (source) {
            if (options.htmlmin && Object.keys(options.htmlmin).length) {
                try {
                    source = '\'' + minify(source, options.htmlmin) + '\'';
                } catch (err) {
                    grunt.warn(err);
                }
            } else {
                source = source.split('\n')
                    .map(function (line) {
                        // escape double quotes
                        line = line.replace(/"([^"]+)"/, "\\\"$1\\\"");
                        // escape single quotes
                        line = line.replace(/'([^']+)'/, "\\\'$1\\\'");
                        return  '\'' + line + '\'';
                    }).join('+\n');

            }

            return source;
        };

        /**
         * Concat html fragments
         *
         * @param f
         */
        this.concat = function (f) {

            // Concat specified files.
            var src = f.src.filter(function (filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function (filepath) {
                var content = grunt.file.read(filepath);

                // Read file source.
                return 'templateStore[\'' + filepath + '\']=' + that.process(content) + ';';
            }).join('\n');

            src = templateStoreHeader + src + templateStoreFooter;

            // Write the destination file.
            grunt.file.write(f.dest, src);

            // Print a success message.
            grunt.log.writeln('File "' + f.dest + '" created.');


        };

        // Iterate over all specified file groups.
        this.files.forEach(this.concat);
    });

};
