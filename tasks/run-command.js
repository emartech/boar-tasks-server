'use strict';

module.exports = function(gulp, config) {
  return function(command, cb) {
    var _ = require('lodash');
    var spawn = require('child_process').spawn;
    var env = _.extend({}, config.server.environmentVariables, process.env);
    var argv = process.argv.slice(2);
    var proc = spawn('node', [command].concat(argv), { env: env, stdio: 'inherit' });

    proc.on('close', function (code) {
      if (code === 0) {
        cb();
      } else {
        cb(new Error(code));
      }
    });
  };
};
