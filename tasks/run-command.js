'use strict';

module.exports = function(gulp, config) {
  return function(command, cb) {
    var _ = require('lodash');
    var spawn = require('child_process').spawn;
    var env = _.extend({}, process.env, config.server.environmentVariables);
    var proc = spawn('node', [command], { env: env });
    proc.stdout.on('data', function (data) {
      console.log(data.toString());
    });
    proc.stderr.on('data', function (data) {
      console.log(data.toString());
    });
    proc.on('close', function (code) {
      console.log('child process exited with code ' + code);
    });
  };
};