'use strict';

module.exports = function(gulp, config) {
  return function(cb) {
    var requires = config.server.test.requires.reduce(function(requires, dependency) {
      return requires.concat(['--require', dependency]);
    }, []);
    var flags = config.server.test.flags.reduce(function(flags, flag) {
      var sliced = flag.split(' ');
      sliced[0] = '--' +sliced[0];
      return flags.concat(sliced);
    }, []);

    var _ = require('lodash');

    var mochaPath = require('path').dirname(require.resolve('mocha')) + '/bin/mocha';
    var command = [mochaPath].concat(flags).concat(requires).concat([config.server.path + '**/*.spec.js']);
    var spawn = require('child_process').spawn;
    var env = _.extend({}, process.env, config.server.test.environmentVariables);
    var proc = spawn('node', command, { env: env, stdio: 'inherit' });

    proc.on('close', function (code) {
      if (code === 0) {
        cb();
      } else {
        cb(new Error(code));
      }
    });
  };
};
