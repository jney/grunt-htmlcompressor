var grunt = require('grunt');

exports.htmlcompressor = {
  main: function(test) {
    test.expect(1);

    var expectA = '<!DOCTYPE HTML> <html lang="en"> <head> <meta charset="UTF-8"> <title></title> </head> <body> </body> </html>';
    var resultA = grunt.file.read('fixtures/output/index.html');
    test.equal(expectA, resultA, 'should compress html');

    test.done();
  }
};
