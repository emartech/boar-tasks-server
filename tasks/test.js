'use strict';

module.exports = function(gulp, config) {
  return function(cb) {
    const requires = config.server.test.requires.reduce(function(requires, dependency) {
      return requires.concat(['--require', dependency]);
    }, []);
    const flags = config.server.test.flags.reduce(function(flags, flag) {
      const sliced = flag.split(' ');
      sliced[0] = '--' +sliced[0];
      return flags.concat(sliced);
    }, []);

    const _ = require('lodash');

    const mochaPath = require('path').dirname(require.resolve('mocha')) + '/bin/mocha';
    const command = [mochaPath].concat(flags).concat(requires).concat([config.server.path + '**/*.spec.js']);
    const spawn = require('child_process').spawn;
    const env = _.extend({}, process.env, config.server.test.environmentVariables);
    const proc = spawn('node', command, { env: env, stdio: 'inherit' });

    proc.on('close', function (code) {
      if (code === 0) {
        cb();
      } else {
        cb(new Error(code));
      }
    });
  };
};
