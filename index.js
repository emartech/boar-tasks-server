'use strict';

var extend = require('deep-extend');
var boarTasksCommon = require('boar-tasks-common');
var config = extend(boarTasksCommon.config, require('./tasks/config'));


module.exports.getTasks = function(gulp, customConfig) {
  var finalConfig = extend(config, customConfig);

  return {
    config: finalConfig,
    server: require('./tasks/server')(gulp, finalConfig),
    build: boarTasksCommon.build(gulp, finalConfig)
  };
};
