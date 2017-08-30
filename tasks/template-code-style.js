'use strict';

module.exports = function(gulp, config) {
  const boarTasksCommon = require('boar-tasks-common');
  const lintTasks = boarTasksCommon.lint(gulp);

  return function() {
    return lintTasks.templates(config.server.templateCodeStylePattern);
  };
};