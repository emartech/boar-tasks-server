'use strict';

var extend = require('deep-extend');
var boarTasksCommon = require('boar-tasks-common');
var config = extend(boarTasksCommon.config, require('./config'));

module.exports.getTasks = function(customConfig) {
  var finalConfig = extend(config, customConfig);

  return {
    config: finalConfig,
    build: boarTasksCommon.build(require('gulp'), finalConfig),
    server: {
      start: require('./tasks/start')(finalConfig),
      copy: require('./tasks/copy')(finalConfig),
      test: require('./tasks/test')(finalConfig),
      runCommand: require('./tasks/run-command')(finalConfig),
      codeStyle: require('./tasks/code-style')(finalConfig),
      templateCodeStyle: require('./tasks/template-code-style')(finalConfig)
    }
  };
};
