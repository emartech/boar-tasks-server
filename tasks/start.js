'use strict';

module.exports = function(gulp, config) {
  return function(cb) {
    var nodemon = require('nodemon');
    var notifier = require('node-notifier');
    var path = require('path');
    var icon = path.join(__dirname, '..', 'boar.png');
    var title = 'Boar tasks';

    nodemon({
      script: config.server.runnable,
      ext: 'js jade',
      watch: [config.build.distPath],
      delay: 2,
      env: config.server.environmentVariables
    }).on('quit', function () {
      notifier.notify({
        title: title,
        message: 'Server exited',
        icon: icon
      });
      cb();
    }).on('restart', function() {
      notifier.notify({
        title: title,
        message: 'Server restarted',
        icon: icon
      });
    });
  };
};
