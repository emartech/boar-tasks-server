'use strict';

module.exports = function(gulp, config) {
  return function(cb) {
    var requires = config.server.test.requires.map(function(dependency) {
      return '--require ' + dependency;
    }).join(' ');
    var flags = config.server.test.flags.map(function(flag) {
      return '--' + flag;
    }).join(' ');

    var _ = require('lodash');

    var mochaPath = require('path').dirname(require.resolve('mocha')) + '/bin/mocha';
    var env = _.extend({}, process.env, config.server.test.environmentVariables);
    var command = mochaPath+' '+flags+' '+requires+' "' + config.server.path + '**/*.spec.js"';

    var exec = require('child_process').exec;

    exec(command, { env: env }, function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  };
};