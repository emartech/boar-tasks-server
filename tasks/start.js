'use strict';

module.exports = function(gulp, config) {
  return function() {
    var _ = require('lodash');
    var nodemon = require('gulp-nodemon');
    var notifier = require('node-notifier');
    var path = require('path');
    var env = _.extend({}, config.server.environmentVariables, process.env);

    nodemon({
      script: config.server.runnable,
      ext: 'js jade',
      watch: [config.build.distPath],
      delay: 1,
      env: env,
      nodeArgs: ['--harmony']
    }).on('restart', function() {
      notifier.notify({
        title: 'Boar tasks',
        message: 'Server restarted',
        icon: path.join(__dirname, '..', 'boar.png')
      });
    });
  };
};