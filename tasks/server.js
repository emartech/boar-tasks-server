'use strict';

var boarTasksCommon = require('boar-tasks-common');

module.exports = function (gulp, config) {
  var lintTasks = boarTasksCommon.lint(gulp);

  return {
    start: function () {
      var nodemon = require('gulp-nodemon');
      var notifier = require('node-notifier');
      var path = require('path');

      nodemon({
        script: config.server.runnable,
        ext: 'js jade',
        watch: [config.build.distPath],
        delay: 1,
        env: config.server.environmentVariables,
        nodeArgs: ['--harmony']
      }).on('restart', function() {
        notifier.notify({
          'title': 'Boar tasks',
          'message': 'Server restarted',
          'icon': path.join(__dirname, "boar.png")
        });
      });
    },

    copy: function (onlyChanged) {
      var gulpif = require('gulp-if');
      var changed = require('gulp-changed');

      return gulp.src(config.server.filePattern)
        .pipe(gulpif(onlyChanged, changed(config.build.distPath)))
        .pipe(gulp.dest(config.build.distPath));
    },

    test: function (cb) {
      var requires = config.server.test.requires.map(function(dependency) {
        return '--require ' + dependency;
      }).join(' ');
      var flags = config.server.test.flags.map(function(flag) {
        return '--' + flag;
      }).join(' ');

      var _ = require('lodash');

      var mochaPath = 'node_modules/boar-tasks-server/node_modules/mocha/bin/mocha';
      var env = _.extend({}, process.env, config.server.test.environmentVariables);
      var command = mochaPath+' '+flags+' '+requires+' "' + config.server.path + '**/*.spec.js"';

      var exec = require('child_process').exec;

      exec(command, { env: env }, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
      });
    },

    runCommand: function (command, cb) {
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
    },

    codeStyle: function() {
      return lintTasks.scripts(config.server.codeStylePattern);
    },

    jadeCodeStyle: function() {
      return lintTasks.jade(config.server.jadeCodeStylePattern);
    }
  };
};
