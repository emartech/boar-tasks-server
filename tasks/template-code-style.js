'use strict';

module.exports = function(gulp, config) {
  return function() {
    return require('boar-tasks-common').lint.templates(config.server.templateCodeStylePattern);
  };
};
