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

  var _ = grunt.util._;

  grunt.registerMultiTask('htmlcompressor', 'Compress html files', function() {
    var options = this.options();

    grunt.verbose.writeflags(options, 'Options');

    var async = grunt.util.async;
    var done = this.async();
    var jar = __dirname + '/../ext/htmlcompressor-1.5.3.jar';
    var processName = options.processName;

    delete options.processName;

    async.forEach(this.files, function(file, next) {
      var src = _.isFunction(file.src) ? file.src() : file.src;
      var srcFiles = grunt.file.expand(src);

      async.forEach(srcFiles, function(srcFile, nextF) {

        var args = _.flatten(['-jar', jar, _.map(options, toParameter), srcFile]);

        grunt.util.spawn({
          cmd: 'java',
          args: args
        }, function(err, output, code) {
          if (err) {
            grunt.log.error();
            grunt.verbose.error(err);
            grunt.fail.warn('htmlcompressor failed to compress html.');
            nextF(err);
          } else {
            var html = output.stdout;
            var dest = _.isFunction(processName) ?
              processName(srcFile, html) : file.dest;
            grunt.file.write(dest, html);
            grunt.log.writeln('File "' + dest + '" created.');
            nextF();
          }
        });
      }, next);
    }, done);
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
