'use strict';

module.exports = function(gulp, config) {
  return function(command, cb) {
    return new Promise(function(resolve, reject) {
      var _ = require('lodash');
      var spawn = require('child_process').spawn;
      var env = _.extend({}, process.env, config.server.environmentVariables);
      var argv = process.argv.slice(2);
      var proc = spawn('node', [command].concat(argv), { env: env });
      proc.stdout.pipe(process.stdout);
      proc.stdin.pipe(process.stdin);
      proc.stderr.pipe(process.stderr);

      proc.on('close', function (code) {
        if (code === 0) {
          if (cb) cb();
          resolve();
        } else {
          var err = new Error(code);
          if (cb) cb(cb);
          reject(err);
        }
      });
    });
  };
};
