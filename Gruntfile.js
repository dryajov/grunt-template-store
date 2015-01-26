/*
 * grunt-template-store
 * https://github.com/dryajov/grunt-template-store
 *
 * Copyright (c) 2014 dryajov
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        'template-store': {
            default_options: {
                files: {
                    'tmp/templateStore_default.js': ['test/fixtures/*.html']
                }
            },
            htmlmin_options: {
                options: {
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeCommentsFromCDATA: true,
                        removeEmptyAttributes: true,
                        removeOptionalTags: true,
                        removeRedundantAttributes: true,
                        useShortDoctype: true,
                        minifyJS: true
                    }
                },
                files: [{
                    src: ['test/fixtures/*.html'],
                    dest: 'tmp/templateStore_htmlmin.js'
                }]
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
    grunt.registerTask('test', ['clean', 'template-store', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
