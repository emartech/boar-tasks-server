'use strict';

var extend = require('deep-extend');
var boarTasksCommon = require('boar-tasks-common');
var config = extend(boarTasksCommon.config, require('./config'));

module.exports.getTasks = function(gulp, customConfig) {
  var finalConfig = extend(config, customConfig);

  return {
    config: finalConfig,
    build: boarTasksCommon.build(gulp, finalConfig),
    server: {
      start: require('./tasks/start')(gulp, finalConfig),
      copy: require('./tasks/copy')(gulp, finalConfig),
      test: require('./tasks/test')(gulp, finalConfig),
      runCommand: require('./tasks/run-command')(gulp, finalConfig),
      codeStyle: require('./tasks/code-style')(gulp, finalConfig),
      templateCodeStyle: require('./tasks/template-code-style')(gulp, finalConfig)
    }
  };
};
