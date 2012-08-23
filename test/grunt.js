module.exports = function(grunt) {
  'use strict';

  grunt.file.mkdir('fixtures/output');

  grunt.initConfig({
    pkg: {
      name: 'grunt-htmlcompressor',
      version: '0.0.1'
    },

    files: {
      test: 'fixtures/compress/<%= pkg.name %>-<%= pkg.version %>'
    },

    test: {
      tasks: ["*_test.js"],
    },

    clean: {
      output: ['fixtures/output']
    },

    htmlcompressor: {
      compile: {
        files: {
          'fixtures/output/index.html': 'fixtures/html/index.html'
        },
        options: {
          type: 'html',
          preserveServerScript: true
        }
      }
    }
  });

  grunt.loadTasks('../node_modules/grunt-contrib/tasks');
  grunt.loadTasks('../tasks');
  grunt.registerTask('default', 'clean htmlcompressor test:tasks');
};
