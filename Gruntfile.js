module.exports = function(grunt) {
   'use strict';
   require('jit-grunt')(grunt, {
      "ngtemplates" : "grunt-angular-templates",
      "comments" : "grunt-stripcomments"
   });

   var pkg = grunt.file.readJSON('package.json');
   var fixtures = {
   };
   var _banner = "/**!\n * @Project: <%= pkg.name %>\n * @Authors: <%= pkg.authors.join(', ') %>\n * @Link: <%= pkg.homepage %>\n * @License: MIT\n * @Date: <%= grunt.template.today('yyyy-mm-dd') %>\n * @Version: <%= pkg.version %>\n***/\n\n";

   grunt.config.init({
      pkg: pkg,

      githooks: {
         all: {
            'pre-commit': 'release'
         }
      },

      jshint: {
         options: {
            jshintrc: './.jshintrc',
            force: true
         },
         frontend: {
            src: [
               './release/**/*.js',
               '!./release/**/*.min.js'
            ]
         }
      },

      symlink: {
         options: {
            overwrite: false
         },
         vendor: {},
         views: {}
      },


      ngAnnotate: {
         options: {
            singleQuotes: true
         },
         modules: {
            files: [
               {
                  src: './release/angular-hitmands-partial.js',
                  dest: './release/angular-hitmands-partial.js'
               }
            ]
         }
      },

      uglify: {
         development: {
            options: {
               mangle: false,
               sourceMap: true,
               compress: {
                  sequences: false
               },
               beautify: {
                  indent_level: 3,
                  indent_start: 3,
                  ascii_only: true,
                  beautify: true,
                  bracketize: true,
                  semicolons: true,
                  quote_keys: true,
                  width: 80
               },
               banner: "(function(window, angular) {\n   'use strict';\n",
               footer: '\n\n})(window, angular);',
               preserveComments: function(node, comment) {
                  var whiteList = /(jshint|@ngInject|@preserve)/g;
                  var keepComment = false;

                  if( whiteList.test(comment.value) ) {
                     keepComment = true;
                  }

                  return keepComment;
               }
            },
            files: [
               {
                  src: [
                     './src/partial-module.js',
                     './src/partial-provider.js',
                     './src/partial-directive.js'
                  ],
                  dest: './release/angular-hitmands-partial.js'
               }
            ]
         },
         production: {
            options: {
               mangle: true,
               compress: {
                  drop_console: true,
                  join_vars: true
               },
               beautify: {
                  ascii_only: true,
                  beautify: false
               },
               sourceMap: false,
               preserveComments: false,
               report: 'gzip',
               footer: '\n'
            },
            files: [
               {
                  src: './release/angular-hitmands-partial.js',
                  dest: './release/angular-hitmands-partial.min.js'
               }
            ]
         }
      },

      concat: {
         bannerize: {
            options: {
               banner: _banner
            },
            files: [
               {
                  src: './release/angular-hitmands-partial.js',
                  dest: './release/angular-hitmands-partial.js'
               },
               {
                  src: './release/angular-hitmands-partial.min.js',
                  dest: './release/angular-hitmands-partial.min.js'
               }
            ]
         }
      },

      shell: {
         karmaSingleRun: {
            command: 'karma start config/karma.js --single-run'
         }
      },

      comments: {
         release: {
            options: {
               singleline: true,
               multiline: true
            },
            src: [ 'release/**/*.js']
         }
      },

      watch: {
         compile: {
            tasks: ['default'],
            files: ['src/**/*.js']
         },
         sample: {
            tasks: ['default'],
            files: ['src/**/*.js']
         },
         frontend: {
            options: {
               livereload: true,
               spawn: false
            },
            files: [
               'src/**/*.html',
               'release/**/*.js'
            ]
         }
      }

   });


   grunt.registerTask('default',
      [
         'newer:uglify:development',
         'newer:ngAnnotate',
         'newer:jshint:frontend'
      ]
   );

   grunt.registerTask('release',
      [
         'uglify:development',
         'ngAnnotate',
         'uglify:production',
         'concat:bannerize'
      ]
   );

};
