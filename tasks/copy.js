'use strict';

module.exports = function(gulp, config) {
  return function(onlyChanged) {
    var gulpif = require('gulp-if');
    var changed = require('gulp-changed');

    return gulp.src(config.server.filePattern, config.server.copySrcOptions)
      .pipe(gulpif(onlyChanged, changed(config.build.distPath)))
      .pipe(gulp.dest(config.build.distPath));
  };
};
