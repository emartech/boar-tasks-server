'use strict';

module.exports = function(gulp, config) {
  return function(cb) {
    return require('boar-tasks-common').lint.templates(config.server.templateCodeStylePattern, cb);
  };
};
