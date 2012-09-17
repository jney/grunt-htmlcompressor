module.exports = function(grunt) {
  'use strict';

  grunt.file.mkdir('fixtures/output');

  grunt.initConfig({
    pkg: {
      name: 'grunt-htmlcompressor',
      version: '0.1.1'
    },

    files: {
      test: 'fixtures/compress/<%= pkg.name %>-<%= pkg.version %>'
    },

    test: {
      tasks: ["*_test.js"]
    },

    clean: {
      output: ['fixtures/output']
    },

    htmlcompressor: {
      compress: {
        src: 'fixtures/html/*.html',
        options: {
          type: 'html',
          processName: function (path) {
            path = path.split('/').pop();
            return 'fixtures/output/' + path;
          },
          preserveServerScript: true
        }
      }
    }
  });

  grunt.loadTasks('../node_modules/grunt-contrib/tasks');
  grunt.loadTasks('../tasks');
  grunt.registerTask('default', 'clean htmlcompressor test:tasks');
};
