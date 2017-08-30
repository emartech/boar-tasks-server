'use strict';

const extend = require('deep-extend');
const _ = require('lodash');
const boarTasksCommon = require('boar-tasks-common');
const config = extend(boarTasksCommon.config, require('./config'));

module.exports.getTasks = function(gulp, customConfig) {
  const finalConfig = _.merge({}, config, customConfig);

  return {
    config: finalConfig,
    nsp: boarTasksCommon.lint(gulp).nsp,
    server: {
      start: require('./tasks/start')(gulp, finalConfig),
      test: require('./tasks/test')(gulp, finalConfig),
      runCommand: require('./tasks/run-command')(gulp, finalConfig),
      runTestCommand: require('./tasks/run-test-command')(gulp, finalConfig),
      runEnvironmentCommand: require('./tasks/run-environment-command'),
      codeStyle: require('./tasks/code-style')(gulp, finalConfig),
      templateCodeStyle: require('./tasks/template-code-style')(gulp, finalConfig)
    }
  };
};
