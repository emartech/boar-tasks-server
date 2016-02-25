'use strict';

var gulp = require('gulp');

module.exports = function(config) {
  return function(onlyChanged) {
    return new Promise(function(resolve, reject) {
      var gulpif = require('gulp-if');
      var changed = require('gulp-changed');
      var stream = gulp.src(config.server.filePattern)
        .pipe(gulpif(onlyChanged, changed(config.build.distPath)))
        .pipe(gulp.dest(config.build.distPath));

      stream.on('end', function() {
        resolve();
      });

      stream.on('error', function(err) {
        reject(err);
      });
    });
  };
};
