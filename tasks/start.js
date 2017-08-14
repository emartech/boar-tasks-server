'use strict';

module.exports = function(gulp, config) {
  return function() {
    const _ = require('lodash');
    const nodemon = require('gulp-nodemon');
    const notifier = require('node-notifier');
    const path = require('path');
    const env = _.extend({}, config.server.environmentVariables, process.env);

    const nodemonConfig = {
      script: config.server.runnable,
      ext: 'js pug',
      watch: [config.server.path],
      delay: 1,
      env: env
    };

    if (env.NODEMON_LEGACY_WATCH === 'true') {
      nodemonConfig.legacyWatch = true;
      nodemonConfig.pollingInterval = 4000;
    }

    nodemon(nodemonConfig).on('restart', function() {
      notifier.notify({
        title: 'Boar tasks',
        message: 'Server restarted',
        icon: path.join(__dirname, '..', 'boar.png')
      });
    });
  };
};
