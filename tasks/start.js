'use strict';

module.exports = function(config) {
  return function() {
    return new Promise(function(resolve) {
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
      }).once('quit', function () {
        notifier.notify({
          title: title,
          message: 'Server exited',
          icon: icon
        });
        resolve();
      }).on('restart', function() {
        notifier.notify({
          title: title,
          message: 'Server restarted',
          icon: icon
        });
      });
    });
  };
};
