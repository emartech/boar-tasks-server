'use strict';

module.exports = function(config) {
  return function() {
    return require('boar-tasks-common').lint.scripts(config.server.codeStylePattern);
  };
};
