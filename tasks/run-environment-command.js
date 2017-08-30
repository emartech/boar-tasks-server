'use strict';

module.exports = function(command, environmentVariables, cb) {
  const _ = require('lodash');
  const spawn = require('child_process').spawn;
  const env = _.extend({}, environmentVariables, process.env);
  const argv = process.argv.slice(2);
  const proc = spawn('node', [command].concat(argv), { env: env, stdio: 'inherit' });

  proc.on('close', function (code) {
    if (code === 0) {
      cb();
    } else {
      cb(new Error(code));
    }
  });
};
