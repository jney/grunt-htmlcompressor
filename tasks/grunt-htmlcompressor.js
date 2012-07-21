/*
 * grunt-htmlcompressor
 * https://github.com/jney/grunt-htmlcompressor
 *
 * Copyright (c) 2012 Jean-Sébastien Ney
 * Licensed under the MIT license.
 */

/*global _:true */

module.exports = function(grunt) {
  'use strict';

  // TODO: ditch this when grunt v0.4 is released
  grunt.util = grunt.util || grunt.utils;

  var _ = grunt.util._;
  var async = grunt.util.async;

  grunt.registerMultiTask('htmlcompressor', 'Compress html files', function() {
    var options = grunt.helper('options', this);

    grunt.verbose.writeflags(options, 'Options');

    // TODO: ditch this when grunt v0.4 is released
    this.files = this.files || grunt.helper('normalizeMultiTaskFiles', this.data, this.target);

    var done = this.async();

    var srcFiles;
    var sourceCode;

    async.forEachSeries(this.files, function(file, next) {
      srcFiles = grunt.file.expandFiles(file.src);
      //options.output = file.dest;

      async.concatSeries(srcFiles, function(srcFile, nextConcat) {
        grunt.helper('htmlcompressor', srcFile, options, function(html) {
          nextConcat(html);
        });
      }, function(html) {
        grunt.file.write(file.dest, html);
        grunt.log.writeln('File \'' + file.dest + '\' created.');

        next();
      });
    }, function() {
      done();
    });
  });

  grunt.registerHelper('htmlcompressor', function(inputFile, opts, callback) {
    var jar = __dirname + '/../ext/htmlcompressor-1.5.3.jar';
    var args = _.flatten(['-jar', jar, _.map(opts, toParameter), inputFile]);

    grunt.utils.spawn({
      cmd: 'java',
      args: args
    }, function(err, output) {
      if (err) {
        grunt.log.error(e);
        grunt.fail.warn('Stylus failed to compile.');
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
};
