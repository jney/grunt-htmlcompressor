/*
 * grunt-htmlcompressor
 * https://github.com/jney/grunt-htmlcompressor
 *
 * Copyright (c) 2012 Jean-Sébastien Ney
 * Licensed under the MIT license.
 */

/*global _:true, __dirname */

module.exports = function(grunt) {
  'use strict';

  // TODO: ditch this when grunt v0.4 is released
  grunt.util = grunt.util || grunt.utils;

  var _ = grunt.util._;

  grunt.registerMultiTask('htmlcompressor', 'Compress html files', function() {
    var options = grunt.helper('options', this);

    grunt.verbose.writeflags(options, 'Options');

    // TODO: ditch this when grunt v0.4 is released
    var files = this.files || grunt.helper('normalizeMultiTaskFiles', this.data, this.target);
    var async = grunt.util.async;
    var done = this.async();
    var processName = options.processName;

    delete options.processName;

    async.forEachSeries(files, function(file) {
      var src = _.isFunction(file.src) ? file.src() : file.src;
      var srcFiles = grunt.file.expandFiles(src);

      srcFiles.forEach(function(srcFile) {
        grunt.helper('htmlcompressor', srcFile, options, function(html) {
          var dest = _.isFunction(processName) ?
            processName(srcFile, html) : file.dest;
          grunt.file.write(dest, html);
          grunt.log.writeln('File "' + dest + '" created.');
        }, done);
      });
    }, done);

  });

  grunt.registerHelper('htmlcompressor', function(inputFile, opts, callback, done) {
    done = done || noop;
    var jar = __dirname + '/../ext/htmlcompressor-1.5.3.jar';
    var args = _.flatten(['-jar', jar, _.map(opts, toParameter), inputFile]);

    grunt.util.spawn({
      cmd: 'java',
      args: args
    }, function(err, output, code) {
      if (err) {
        grunt.log.error(err);
        grunt.fail.warn('htmlcompressor failed to compress html.');
        done(false);
      } else {
        callback(output.stdout);
      }
    });
  });

  // Convert a pair of key/value to an array
  // if the value is `true` only the key is kept
  //
  // Example:
  //
  //   toParameter('lineBreak', 2)
  //   // => ['--line-break', 2]
  //
  //   toParameter('preserveComments', true)
  //   // => ['--preserve-comments']
  function toParameter(val, key) {
    var str = '--' + key.replace(/([A-Z])/g, function(a) {
      return '-' +  a.toLowerCase();
    });

    return (val === true) ? [str] : [str, val];
  }

  function noop () {}
};
