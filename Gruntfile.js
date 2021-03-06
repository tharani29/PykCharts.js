module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        js_src_path: 'src/js',
        js_distro_path: 'dist',
        css_src_path: 'src/css',
        css_distro_path: 'dist',

        concat: {
            'js': {
                'src': [
                      '<%= js_src_path %>/pyk.js'
                    , '<%= js_src_path %>/validation.js'
                    , '<%= js_src_path %>/oneD/bubble.js'
                    , '<%= js_src_path %>/oneD/funnel.js'
                    , '<%= js_src_path %>/oneD/percentageColumn.js'
                    , '<%= js_src_path %>/oneD/percentageBar.js'
                    , '<%= js_src_path %>/oneD/pie.js'
                    , '<%= js_src_path %>/oneD/donut.js'
                    , '<%= js_src_path %>/oneD/electionPie.js'
                    , '<%= js_src_path %>/oneD/electionDonut.js'
                    , '<%= js_src_path %>/oneD/pieFunctions.js'
                    , '<%= js_src_path %>/oneD/pyramid.js'
                    , '<%= js_src_path %>/oneD/treemap.js'
                    // , '<%= js_src_path %>/other/other.js'
                    , '<%= js_src_path %>/other/pictograph.js'
                    , '<%= js_src_path %>/multiD/multiD.js'
                    , '<%= js_src_path %>/multiD/annotation.js'
                    , '<%= js_src_path %>/multiD/crosshair.js'
                    , '<%= js_src_path %>/multiD/grid.js'
                    , '<%= js_src_path %>/multiD/scaleFunction.js'
                    , '<%= js_src_path %>/multiD/crossHairMovement.js'
                    , '<%= js_src_path %>/multiD/line.js'
                    , '<%= js_src_path %>/multiD/multiSeriesLine.js'
                    , '<%= js_src_path %>/multiD/panelsOfLine.js'
                    , '<%= js_src_path %>/multiD/lineFunctions.js'
                    , '<%= js_src_path %>/multiD/area.js'
                    , '<%= js_src_path %>/multiD/stackedArea.js'
                    , '<%= js_src_path %>/multiD/areaFunctions.js'
                    , '<%= js_src_path %>/multiD/bar.js'
                    , '<%= js_src_path %>/multiD/groupBarChart.js'
                    , '<%= js_src_path %>/multiD/column.js'
                    , '<%= js_src_path %>/multiD/groupColumnChart.js'
                    , '<%= js_src_path %>/multiD/scatterplot.js'
                    , '<%= js_src_path %>/multiD/panelsOfScatterplot.js'
                    , '<%= js_src_path %>/multiD/pulse.js'
                    , '<%= js_src_path %>/multiD/scatterplotFunctions.js'
                    , '<%= js_src_path %>/multiD/spiderWeb.js'
                    , '<%= js_src_path %>/multiD/waterfall.js'
                    , '<%= js_src_path %>/maps/maps.js'
                    , '<%= js_src_path %>/maps/oneLayer.js'
                    , '<%= js_src_path %>/init.js'
                ],
                'dest': '<%= js_distro_path %>/pykcharts.<%= pkg.version %>.js'
            },
            'css': {
                'src': ['<%= css_src_path %>/*.css'],
                'dest': '<%= css_distro_path %>/pykcharts.<%= pkg.version %>.css'
            }
        },

        uglify: {
            'my_target': {
                'files': {
                '<%= js_distro_path %>/pykcharts.<%= pkg.version %>.min.js': // destination
                ['<%= js_distro_path %>/pykcharts.<%= pkg.version %>.js'] // source
                }
            },
            'options': {
              'preserveComments': 'some'
            }
        },

        cssmin: {
            'minify': {
                'expand': true,
                'cwd': '<%= css_distro_path %>/',
                'src': ['pykcharts.<%= pkg.version %>.css', '!*.min.css'],
                dest: '<%= css_distro_path %>/',
                ext: '.<%= pkg.version %>.min.css'
            }
        },

        watch: {
            src: {
                files: ['<%= css_src_path %>/*.css', '<%= js_src_path %>/*.js'],
                tasks: ['build'],
            },
        },

        jshint: {
            all: ['Gruntfile.js', '<%= js_src_path %>/*.js']
        },

        clean: {
            // Clean any pre-commit hooks in .git/hooks directory
            hooks: ['.git/hooks/pre-commit']
        },

        // Run shell commands
        shell: {
            hooks: {
                // Copy the project's pre-commit hook into .git/hooks
                command: 'cp git-hooks/pre-commit .git/hooks/pre-commit'
            },
            rmclogs: {
                // Run the script
                command: 'bash pre-build/script.bash'
            }
        },

        // comments: {
        //     js: {
        //         // Target-specific file lists and/or options go here.
        //         options: {
        //             singleline: true,
        //             multiline: true
        //         },
        //         src: ['lib/*.js', 'src/**/*.js', 'pykih-charts/**/*.js'] // files to remove comments from
        //     }
        // },

        // Remove consolelogs
        removelogging: {
            dist: {
                src: ['lib/*.js'],
                options: {}
            }
        },

        // Run QUnit Test
        qunit: {
            all: {
                options: {
                    timeout: 5000,
                    urls: ['http://localhost:80/PykCharts/unit_testing/test.html']
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 80,
                    base: '.'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-remove-logging');
    // grunt.loadNpmTasks('grunt-stripcomments');

    // Clean the .git/hooks/pre-commit file then copy in the latest version
    grunt.registerTask('hookmeup', ['clean:hooks', 'shell:hooks']);

    //build task
    // grunt.registerTask('build', ['comments', 'concat', 'removelogging', 'uglify', 'cssmin', 'hookmeup']);
    grunt.registerTask('build', ['concat', 'removelogging', 'uglify', 'cssmin', 'hookmeup']);

    grunt.event.on('watch', function(action, filepath) {
        grunt.log.writeln(filepath + ' has ' + action);
    });

    //Connect to port for qunit to communicate
    grunt.registerTask('test', ['connect', 'qunit']);

};
