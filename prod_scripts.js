var fs = require('fs');
var del = require('del');
var copy = require('recursive-copy');
var replace = require('replace');

// Delete all public files
del(['./public/*']).then(paths => {
  console.log('Deleted files and folders:\n', paths.join('\n'));

  copyfile();
});

// Copy files from src to public
var copyfile = function(){

  // Source elements
  var options = {
    filter: [
      'css/**/*',
      'fonts/**/*',
      'data/*',
      // Images
      'img/ciudades/*',
      'img/generos/*',
      'img/*',

      // JS vendor files
      'js/vendor/*.js',
      // Own javascript files
      'js/modules/*.js',
      'js/app.js',

      // HTML
      'express-online-*.html',
      'express-cash-*.html',
      'message-*.html',
      'message-voucher-*.html',
      'message-integration-*.html',
      '!.DS_Store',
      '!README.html',
      '!index.html'
    ],
  };
  copy('src', 'public/source/', options)
    .then(function(results) {
      console.info('Copied ' + results.length + ' files');
    })
    .catch(function(error) {
      console.error('Copy failed: ' + error);
    });

  // Index
  copy('src', 'public/', {filter: ['index.html']})
    .then(function(results) {
      addSourcePath();
      console.info('Copied ' + results.length + ' files');
    })
    .catch(function(error) {
      console.error('Copy failed: ' + error);
    });

    var addSourcePath = function() {
      // Edit index.html
      replace({
        regex: 'js/',
        replacement: 'source/js/',
        paths: ['./public/index.html'],
        recursive: true,
        silent: true
      });
    };
  }
