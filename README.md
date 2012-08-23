[![build status](https://secure.travis-ci.org/jney/grunt-htmlcompressor.png)](http://travis-ci.org/jney/grunt-htmlcompressor)
# grunt-htmlcompressor

[Grunt][grunt] plugin for html compression, using [htmlcompressor][htmlcompressor].

## Getting Started

Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-htmlcompressor`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-htmlcompressor');
```

Then specify what files to compress in your config:

```javascript
grunt.initConfig({
  htmlcompressor: {
    compile: {
      files: {
        'dest/index.html': 'src/index.html'
      },
      options: {
        type: 'html',
        preserveServerScript: true
      }
    }
  }
});
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md
[htmlcompressor]: http://code.google.com/p/htmlcompressor/

## Release History
* 0.0.1 First Release

## License
Copyright (c) 2012 Jean-Sébastien Ney
Licensed under the MIT license.
