'use strict';

module.exports = function(gulp, config) {
  return function(command, cb) {
    var _ = require('lodash');
    var spawn = require('child_process').spawn;
    var env = _.extend({}, process.env, config.server.environmentVariables);
    var proc = spawn('node', [command], { env: env });
    proc.stdout.pipe(process.stdout);
    proc.stdin.pipe(process.stdin);
    proc.stderr.pipe(process.stderr);

    proc.on('close', function (code) {
      console.log('child process exited with code ' + code);
    });
  };
};
