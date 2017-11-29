module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({

        config: {
            src: './src',
            dist: './dist'
        },

        // Builder
        assemble: {
            options: {
                partials: ['<%= config.src %>/partials/*.hbs'],
                flatten: true
            },
            patterns: {
                options: {
                    layout: '<%= config.src %>/layouts/patterns.hbs'
                },
                files: {'<%= config.dist %>/': ['<%= config.src %>/patterns/**/*.md']}
            }
        },

        // Clean the dist folder
        clean: {
            all: ['<%= config.dist %>/']
        },

        watch: {
            html: {
                files: [
                    '<%= config.src %>/layouts/**/*.hbs',
                    '<%= config.src %>/patterns/**/*.{html,md,json}'
                ],
                tasks: ['assemble:patterns']
            }
        },

        // Static file server
        browserSync: {
            dev: {
                options: {
                    directory: true,
                    server: '<%= config.dist %>',
                    watchTask: true
                },
                bsFiles: {
                    src : [
                        '<%= config.dist %>/**/*'
                    ]
                }
            }
        }
    });
  
    grunt.loadNpmTasks('grunt-assemble');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // The default task to run with the `grunt` command.
    grunt.registerTask('default', ['clean', 'assemble', 'browserSync', 'watch']);

    // The build task to run with the `grunt` command.
    grunt.registerTask('build', ['clean', 'assemble']);
  };
